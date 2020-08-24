

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