export function addNewOption(optiontype, counter){
  if(optiontype === 'checkbox'){
    return {
      id : "cb" + counter.cb++,
      name : "",
      type : "checkbox",
      priceDiff : false,
      price: 0,
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
      price : {Prem: 0.00, UltPrem: 0.00},
      items : []
      //Optional: includeColor : []
      //Optional: excludeColor : []
    };
  } else if(optiontype === 'section'){
    return {
      id : "sc" + counter.sc++,
      section : "",
      type : "section",
      hasCostTier : false,
      costTier: {Stand: 0.00, Prem: 0.00, UltPrem: 0.00},
      colorid : "",
      colorInclusion :"all",
      items : [],
      modelSection : {models:{}, modelOrder:[]},
      multiSelect : false
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
  } else if(optiontype === 'preset'){
    return {
      id: "ps" + counter.ps++,
      name: "",
      filename: "",
      type : "preset",
      optionSelection: [],
    }
  }
  return null;
}