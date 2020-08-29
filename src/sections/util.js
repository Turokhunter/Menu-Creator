import colorData from "../data/filament.json"
import { FiUnderline } from "react-icons/fi";

export function populateOptions(importFile){
  const importedObject = JSON.parse(importFile);
  var filaments = colorData.filament;
  var colors = {};
  filaments.forEach((color) =>{
    colors[color.id] = color;
  });

  var optionObject = {}
  var newState = { mapping: {},
               options: []
              };
  importedObject.options.forEach((option)=>{
    if(option.type === "colorpicker"){
      let newOption  = {...option};
      newOption.items = [];
      if(option.includeColor !== undefined){
        option.includeColor.forEach((color)=>{
          newOption.items.push({id: colors[color].id, name: colors[color].name});
        });
        newOption.colorInclusion = "include";
        
        delete newOption.includeColor;
      } else if(option.excludeColor !== undefined){
        option.excludeColor.forEach((color)=>{
          newOption.items.push({id: colors[color].id, name: colors[color].name});
        });
        newOption.colorInclusion = "exclude";
        delete newOption.excludeColor;
      } else {//has to be all
        newOption.colorInclusion = "all";
      }
      
      newState.options.push(newOption);
    } else if(option.type === "dropdown"){
      newState.options.push(option);
      optionObject[option.id] = {};
      option.items.forEach((item)=>{
        optionObject[option.id][item.id] = item.name;
      });
    } else if(option.type === "checkbox"){
      newState.options.push(option);
    }
  });

  var newMapping = {};
  for(const [key, element] of Object.entries(importedObject.mapping)){
      var lstElements = key.split("&");
      const easyRead = lstElements.map((ele)=>{
        if(ele.type === "dropdown"){
          const pair = ele.split("=");
          return pair[0] + "=" + optionObject[pair[0]][pair[1]];
        } else {
          return ele;
        }
      });
      newMapping[key] = {id:key, easyRead: easyRead.join("&"), varient: element};
  }

  newState.mapping = newMapping;
  return newState;
}
//TODO::Combine easyRead into a function
export function createMapping(options){
    var newMapping = {};
    var arr1 = [], arr2 = [];
    options.forEach((option)=>{
        if(option.priceDiff === true){
          if(option.type === "colorpicker"){
            if(arr1.length){
              arr1.forEach((el)=>{
                const stand = [...el];
                stand.push(option.id + "=Stand");
                arr2.push(stand);
                const prem = [...el];
                prem.push(option.id + "=Prem");
                arr2.push(prem);
                const ultperm = [...el];
                ultperm.push(option.id + "=UltPrem")
                arr2.push(ultperm);
              });
            } else {
              arr2.push([option.id + "=Stand"]);
              arr2.push([option.id + "=Prem"]);
              arr2.push([option.id + "=UltPrem"]);
            }
          } else if(option.type === "dropdown"){
            
            if(arr1.length){
              arr1.forEach((el)=>{
                option.items.forEach((item)=>{
                  const opt = [...el];
                  opt.push(option.id + "=" + item.id);
                  arr2.push(opt);
                });
              });
            } else {
              option.items.forEach((item)=>{
                arr2.push([option.id + "=" + item.id]);
              });
            }
          } else if(option.type === "checkbox"){
            if(arr1.length){
              arr1.forEach((el)=>{
                arr2.push([...el].push(option.id + "=true"));
                arr2.push([...el].push(option.id + "=false"));
              });
            } else {
              arr2.push([option.id + "=true"]);
              arr2.push([option.id + "=false"]);
            }
          }
          arr1 = [...arr2];
          arr2 = [];
        }
    });
    arr1.forEach((lst) =>{
      var easyRead = [];
      lst.forEach((item) =>{
        if(item.includes("dd")){
          var keys = item.split("=")
          const optionIdx = options.find(ele => ele.id === keys[0]);
          const itemIdx = optionIdx.items.find(ele=>ele.id === keys[1]);
          easyRead.push(keys[0] + "=" + itemIdx.name);
        } else {
          easyRead.push(item);
        }        
      });
      const newLst = lst.join("&");
      newMapping[newLst] = {id:newLst, easyRead: easyRead.join("&")};
    });
    return newMapping;
}

export function createJsonFile(state, columns){
  var FileSaver = require('file-saver');
  var newMapping = {};
  var newOptions = [];
  var csvVarient = [];
  for(const [key, column] of Object.entries(columns)){
    if(key === "unassigned"){
      continue;
    }
    column.taskIds.forEach((id)=>{
      newMapping[id] = column.title;
      csvVarient.push(column.title);
    });
  }

  state.options.forEach((option)=>{
    if(option.type === "colorpicker"){
      let newOption  = {...option};
      if(option.colorInclusion === "all"){
        //do nothing
      } else if (option.colorInclusion === "include"){
        var color = [];
        option.items.forEach((item)=>{
          color.push(item.id);
        });
        newOption["includeColor"] = color;
      } else if (option.colorInclusion === "exclude"){
        var color = [];
        option.items.forEach((item)=>{
          color.push(item.id);
        });
        newOption["excludeColor"] = color;
      }
      delete newOption.colorInclusion;
      delete newOption.items;
      newOptions.push(newOption);
    } else if(option.type === "dropdown"){
      newOptions.push(option);
    } else if(option.type === "checkbox"){
      newOptions.push(option);
    }
  });



  const jsonFile = {mapping: newMapping,
                    options: newOptions}
  var jsonse = JSON.stringify(jsonFile, null, 2);


  var blob = new Blob([jsonse], {type: "application/json"});
  FileSaver.saveAs(blob, "file.json");

  var csvblob = new Blob([csvVarient.join(",")], {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(csvblob, "Varients.csv");
}