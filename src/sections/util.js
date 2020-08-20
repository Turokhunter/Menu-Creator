


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
        newMapping[lst.join("&")] = "";
    });
    return newMapping;
}