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

    };
  }
  return "";
}