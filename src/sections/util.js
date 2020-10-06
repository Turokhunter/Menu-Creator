import { getColors } from "../components/getColors";
import colorData from "../data/filament.json"

function generateEasyRead(lst, options){
  var optionObject = {};
  options.forEach((option)=>{
    if(option.type === "dropdown"){
      optionObject[option.id] = {};
      option.items.forEach((item)=>{
        optionObject[option.id][item.id] = item.name;
      });
    }
  });

  var easyRead = [];
  lst.forEach((item) =>{
    if(item.includes("dd")){
      const pair = item.split("=");
      easyRead.push(pair[0] + "=" + optionObject[pair[0]][pair[1]]);
    } else {
      easyRead.push(item);
    }        
  });
  return easyRead;
}

function fromJson2SystemColor(option, newOption, colors){
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
}
//TODO::Find max counter for each type
export function populateOptions(importFile, counter){
  const importedObject = JSON.parse(importFile);
  var filaments = colorData.filament;
  var colors = {};
  filaments.forEach((color) =>{
    colors[color.id] = color;
  });
  
  var newState = { mapping: {},
                   options: []
                 };

  if(importedObject.stl){
    let newSTL = {};
    newSTL["camera"] = importedObject.stl.camera;
    newSTL["position"] = importedObject.stl.position;
    newSTL["scale"] = importedObject.stl.scale;
    newSTL["mindist"] = importedObject.stl.mindist;
    newSTL["maxdist"] = importedObject.stl.maxdist;
    newSTL["type"] = "stl";
    newSTL["id"] = "stl";
    newState.options.push(newSTL);
    var sectionLookup = {};
    importedObject.stl.sections.forEach( (section) => {
      let newSection  = {...section};
      fromJson2SystemColor(section, newSection, colors);
      newSection["modelSection"] = {models:{}, modelOrder:[]};
      sectionLookup[newSection.id] = newState.options.length;
      counter.sc = Math.max(counter.sc, parseInt(newSection.id.replace("sc","")) + 1);      
      newState.options.push(newSection);
    });

    importedObject.stl.models.forEach((model) =>{
      const newModel = {...model};
      const sectionId = newModel.section;
      delete newModel.section;
      newState.options[sectionLookup[sectionId]].modelSection.models[model.id] = newModel;
      newState.options[sectionLookup[sectionId]].modelSection.modelOrder.push(model.id);
      counter.md = Math.max(counter.md, parseInt(model.id.replace("md","")) + 1);      
    });
  }

  importedObject.options.forEach((option)=>{
    if(option.type === "colorpicker"){
      let newOption  = {...option};      
      fromJson2SystemColor(option, newOption, colors);
      counter.cp = Math.max(counter.cp, parseInt(option.id.replace("cp","")) + 1);      
      newState.options.push(newOption);
    } else if(option.type === "dropdown"){
      counter.dd = Math.max(counter.dd, parseInt(option.id.replace("dd","")) + 1);      
      newState.options.push(option);
    } else if(option.type === "checkbox"){
      counter.cb = Math.max(counter.cb, parseInt(option.id.replace("cb","")) + 1);      
      newState.options.push(option);
    }
  });



  var newMapping = {};
  for(const [key, element] of Object.entries(importedObject.mapping)){
    var lstElements = key.split("&");
    const easyRead = generateEasyRead(lstElements, newState.options);
    newMapping[key] = {id:key, easyRead: easyRead.join("&"), varient: element};
  }

  newState.mapping = newMapping;
  return newState;
}

function mapVariant(arr1, arr2, id, lst){
  if(arr1.length){
    arr1.forEach((el)=>{
      lst.forEach((val) => {
        const stand = [...el];
        if(val === ""){
          stand.push(val);
        } else {
          stand.push(id + "=" + val);
        }
        arr2.push(stand);
      })
    });
  } else {
    lst.forEach((val) => {
      if(val === ""){
        arr2.push([val]);
      } else {
        arr2.push([id + "=" + val]);
      }
    })
  }
}  

export function createMapping(options){
    var newMapping = {};
    var arr1 = [], arr2 = [];
    options.forEach((option)=>{
        if(option.priceDiff === true){
          if(option.type === "colorpicker"){
            mapVariant(arr1, arr2, option.id, ["Stand", "Prem", "UltPrem"]);
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
            mapVariant(arr1, arr2, option.id, ["true", "false"]);
          }
          arr1 = [...arr2];
          arr2 = [];
        } else if(option.type === "section"){
          if (option.multiSelect && option.hasCostTier){
            option.modelSection.modelOrder.forEach( (modelId) =>{
              mapVariant(arr1, arr2, modelId, ["false", "Stand", "Prem", "UltPrem"]);
              arr1 = [...arr2];
              arr2 = [];
            });
            let temp = arr1;
            arr1 = arr2;
            arr2 = temp; 
          } else if(option.multiSelect) {
            option.modelSection.modelOrder.forEach( (modelId) =>{
              mapVariant(arr1, arr2, modelId, ["false", "Stand"]);
              arr1 = [...arr2];
              arr2 = [];
            });
            let temp = arr1;
            arr1 = arr2;
            arr2 = temp;            
          } else if(option.hasCostTier) {
            mapVariant(arr1, arr2, option.id, ["Stand", "Prem", "UltPrem"]);
          }
          arr1 = [...arr2];
          arr2 = [];
        }
    });

    arr1.forEach((lst) =>{
      const easyRead = generateEasyRead(lst, options);
      const newLst = lst.filter(Boolean).join("&");
      newMapping[newLst] = {id:newLst, easyRead: easyRead.filter(Boolean).join("&")};
    });
    return newMapping;
}

export function createJsonFile(state, columns){
  var letterMapping = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  var FileSaver = require('file-saver');
  var filaments = colorData.filament;
  var newMapping = {};
  var newOptions = [];
  var csvVarient = {};
  var hashMap = {};
  var stl = {sections:[], models:[]};
  var colorPickerVarient = [];

  if(state.numVarients > 1000){
    let charMap = 0;
    let numMap = 0;
    let extraMap = '';
    for(const [key, column] of Object.entries(columns)){
      if(key === "unassigned"){
        continue;
      }
      column.taskIds.forEach((id)=>{
        let variantList = id.split('&');
        let newId = "";
        variantList.forEach((varName)=>{
          if(!(varName in hashMap)){
            extraMap = numMap !== 0 ? numMap.toString(): '';
            hashMap[varName] = extraMap + letterMapping.charAt(charMap);
            if(charMap + 1>= letterMapping.length){
              charMap = 0;
              numMap++;
            } else {
              charMap++;  
            }
          }
          newId += hashMap[varName];
        })        
        if(!(column.title in hashMap)){
          extraMap = numMap !== 0 ? numMap.toString(): '';
          hashMap[column.title] = extraMap + letterMapping.charAt(charMap);
          if(charMap + 1 >= letterMapping.length){
            charMap = 0;
            numMap++;
          } else {
            charMap++;  
          }
        }
        newMapping[newId] = hashMap[column.title];
        
      });
      colorPickerVarient.push(column.title);
    }
    colorPickerVarient.sort();
  } else {
    for(const [key, column] of Object.entries(columns)){
      if(key === "unassigned"){
        continue;
      }
      column.taskIds.forEach((id)=>{
        newMapping[id] = column.title;
        colorPickerVarient.push(column.title);
      });
    }
  }
  csvVarient["Cost Tier"] = colorPickerVarient.join(",");


  state.options.forEach((option)=>{
    if(option.type === "colorpicker"){
      let newOption  = {...option};
      if(option.colorInclusion === "all"){
        //do nothing
      } else if (option.colorInclusion === "include"){
        let color = [];
        option.items.forEach((item) =>{
          color.push(item.id);
        });
        newOption["includeColor"] = color;
      } else if (option.colorInclusion === "exclude"){
        let color = [];
        option.items.forEach((item)=>{
          color.push(item.id);
        });
        newOption["excludeColor"] = color;
      }
      var selectedFilament = getColors(option, filaments);
      var colorVarient = [];
      selectedFilament.forEach((filament)=> {
        colorVarient.push(filament.name);
      });
      csvVarient[option.name] = colorVarient.join(",");

      delete newOption.colorInclusion;
      delete newOption.items;
      newOptions.push(newOption);
    } else if(option.type === "dropdown"){
      var dropdownVarient = [];
      option.items.forEach((item)=> {
        dropdownVarient.push(item.name);
      });
      csvVarient[option.name] = dropdownVarient.join(",");

      newOptions.push(option);
    } else if(option.type === "checkbox"){
      newOptions.push(option);
    } else if(option.type === "stl"){
      stl["camera"] = option.camera;
      stl["position"] = option.position;
      stl["scale"] = option.scale;
      stl["mindist"] = option.mindist;
      stl["maxdist"] = option.maxdist;
    } else if(option.type === "section"){
      let newSection = {...option};
      if(option.colorInclusion === "all"){
        //do nothing
      } else if (option.colorInclusion === "include"){
        var color = [];
        option.items.forEach((item)=>{
          color.push(item.id);
        });
        newSection["includeColor"] = color;
      } else if (option.colorInclusion === "exclude"){
        let color = [];
        option.items.forEach((item)=>{
          color.push(item.id);
        });
        newSection["excludeColor"] = color;
      }
      delete newSection.colorInclusion;
      delete newSection.items;
      delete newSection.modelSection;
      //add section
      stl.sections.push(newSection);
      //add model
      option.modelSection.modelOrder.forEach((modelId)=>{
        const newModel = option.modelSection.models[modelId];
        if(newModel.group === ""){
          delete newModel.group;
        }
        newModel["colorId"] = option.colorId;
        newModel["section"] = option.id;
        stl.models.push(newModel);
      })
    }
  });
  let jsonFile = {mapping: newMapping,
                  options: newOptions};
  if(stl.sections.length){
      jsonFile["stl"] = stl;
  } 
  if(Object.entries(hashMap).length > 0){
    jsonFile["hashMap"] = hashMap;
  }
  
  jsonFile["variant"]  = csvVarient;

  var jsonse = JSON.stringify(jsonFile, null, 2);

  
  var blob = new Blob([jsonse], {type: "application/json"});
  FileSaver.saveAs(blob, "file.json");
}