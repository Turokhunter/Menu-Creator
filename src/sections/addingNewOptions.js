export function addNewOption(optiontype, counter){
  if(optiontype === 'checkbox'){
    return {
      id : "cb" + counter.cb++,
      name : "",
      type : "checkbox",
      priceDiff : false,
      selected : false
    };
  } else if(optiontype === 'dropdown'){
    return {
      id : "dd" + counter.dd++,
      name : "",
      type : "dropdown",
      priceDiff : false,
      selected : "",
      items : []
    };
  } else if(optiontype === 'colorpicker'){
    return {
      id : "cp" + counter.cp++,
      name : "",
      type : "colorpicker",
      priceDiff : false,
      colorId : "",
      colorInclusion:"all",
      items : []
      //Optional: includeColor : []
      //Optional: excludeColor : []
    };
  } else if(optiontype === 'section'){
    return {
      id : "cp" + counter.sc++,
      name : ""
    };
  } else if(optiontype === 'stl'){
    return {
      id: "stl",
      camera: {x:0, y:0, z:0},
      position: {x:0, y:0, z:0},
      scale: {x:1.0, y:1.0, z:1.0},
      mindist: 20,
      maxdist: 60,
      type : "stl",
    };
  }
  return null;
}