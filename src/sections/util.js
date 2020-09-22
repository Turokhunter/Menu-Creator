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

export function populateOptions(importFile){
  const importedObject = JSON.parse(importFile);
  var filaments = colorData.filament;
  var colors = {};
  filaments.forEach((color) =>{
    colors[color.id] = color;
  });
  
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
    } else if(option.type === "checkbox"){
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
              mapVariant(arr1, arr2, modelId, ["", "Stand", "Prem", "UltPrem"]);
              arr1 = [...arr2];
              arr2 = [];
            });
            let temp = arr1;
            arr1 = arr2;
            arr2 = temp; 
          } else if(option.multiSelect) {
            option.modelSection.modelOrder.forEach( (modelId) =>{
              mapVariant(arr1, arr2, modelId, ["", "Stand"]);
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