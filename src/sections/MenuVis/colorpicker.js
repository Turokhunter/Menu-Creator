var sectoTier = {};
var sectionTier = [];

function getModelbyId(id){
  for(var i = 0; i < blaster.models.length; i++){
    if(blaster.models[i].id === id){
      return blaster.models[i];
    }
  }
  console.log("We couldn't find the model Id.");
}

function getSectionInfo(sectionName){
  for(var i = 0; i < blaster.sections.length; i++){
    section = blaster.sections[i];
    if(section.section == sectionName){
      return section;
    }
  }
  console.log("Couldn't find section information.")
}

function getSectionModels(sectionName){
  var models = [];
  for(var i = 0; i < blaster.models.length; i++){
    if(blaster.models[i].section === sectionName){
      models.push(blaster.models[i]);
    }
  }
  if(models.length == 0){
    console.log("We couldn't find any model with that section.")
  }
  return models;
}

function getGroupModels(groupName){
  var models = [];
  for(var i = 0; i < blaster.models.length; i++){
    if(blaster.models[i].group === groupName){
      models.push(blaster.models[i]);
    }
  }
  if(models.length == 0){
    console.log("We couldn't find any model with that section.")
  }
  return models;

}
function getFilamentbyId(id){
  for(var i = 0; i < allFilaments.length; i++){
    if(allFilaments[i].id === id){
      return allFilaments[i];
    }
  }
  console.log("couldnt find the selected color.",id);
  return allFilaments[0];
}

function updateColorOfModel(model, color){
  model.mesh.material.color.set(color.color);
  model.mesh.material.color.convertSRGBToLinear();
  model.mesh.material.opacity = color.opacity;
  model.colorId = color.id;
}

function updatePricing(sectionName, tier){
  if(sectoTier[sectionName] === undefined){
    return;
  }
  if(tier == "Standard"){
    sectionTier[sectoTier[sectionName]] = "Stand";
  } else if (tier == "Premium"){
    sectionTier[sectoTier[sectionName]] = "Prem";
  } else if (tier == "Ultra Premium"){
    sectionTier[sectoTier[sectionName]] = "UltPrem";
  } else {
    console.log("No tier was selected");
    $('.single-option-selector:eq(0)').val(-1).trigger('change');
  }

  var str = "";
  var sectionInfo = getSectionInfo(sectionName);
  if( tier == "Standard" || sectionInfo.costTier === undefined){
    str = sectionName + ":";
  } else {
    var price = sectionInfo.costTier[tier];
    str = sectionName + "(+$" + price + ")" + ":";
  }
  $("#"+sectionName+"-title").text(str);

  var newValue = sectionTier.join("-");
  $('.single-option-selector:eq(0)').val(newValue).trigger('change');
}

function updateModelCostTeir(model, tier){
  if(tier == "Standard"){
    model.tier = 0;
  } else if(tier == "Premium"){
    model.tier = 1;
  } else if(tier == "Ultra Premium"){
    model.tier = 2;
  } else {
    console.log("No cost tier was set");
  }
}

function isPriceUpdated(model, color){
  var models = getSectionModels(model.section);
  var sectionInfo = getSectionInfo(model.section);
  if(sectionInfo.hasCostTier === undefined){
    return;
  }
  for(var i = 0 ; i < models.length; i++){
    var currModel = models[i];
    if(currModel.tier === undefined){
      continue;
    }
    if(currModel.tier > model.tier){
      return;
    }
  }
  updatePricing(model.section, color.tier);
}

function selectModelColor(modelId, colorId){
  var model = getModelbyId(modelId);
  var color = getFilamentbyId(colorId);
  updateColorOfModel(model, color);
  updateModelCostTeir(model, color.tier);

  isPriceUpdated(model, color);
}

function selectSectionColor(sectionName, colorId){
  var models = getSectionModels(sectionName);
  var color = getFilamentbyId(colorId);

  for(var i = 0; i < models.length; i++){
      updateColorOfModel(models[i], color);
      updateModelCostTeir(models[i], color.tier);
  }

  updatePricing(sectionName, color.tier);
}

function breakModelIntoSection(blaster){
  var sections = {};
  var sectionNames = [];
  for(var i = 0; i < blaster.models.length; i++){
    var sname = blaster.models[i].section;
    if(sectionNames.includes(sname) == false){
      sectionNames.push(sname);
    }
  }
  for(var i = 0; i < sectionNames.length; i++){
    sections[sectionNames[i]] = [];
  }

  for(var i = 0; i < blaster.models.length; i++){
    sections[blaster.models[i].section].push(blaster.models[i]);
  }

  return sections;
}

function updateDropdownSelection(div, fid){
  var ancestor = div.parentNode.parentNode.parentNode;
  var button = ancestor.querySelector("button");
  var children = button.childNodes;

  var filament = getFilamentbyId(fid);
  children[0].style.backgroundColor = filament.color;
  children[1].textContent = filament.name;

}

function updateSectionChildren(div, fid){
  var filament = getFilamentbyId(fid);
  //goes hey enough to asscesss
  var ancestor = div.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var buttons = ancestor.getElementsByClassName("button");
  for(var i = 1; i <  buttons.length; i++){
    var children = buttons[i].childNodes;
    children[0].style.backgroundColor = filament.color;
    children[1].textContent = filament.name;
  }
}


function createDropdown(name, selectedColorId, selectModel){
  var filament = getFilamentbyId(selectedColorId);
  var column = $("<div>", {class:"column "});
  var div = $("<div>", {class:"dropdown"});
  div.click(function(event){
    event.stopPropagation();
    this.classList.toggle('is-active');
  });
  //setup the starting button
  trigger = $("<div>", {class:"dropdown-trigger"});
  div.append(trigger);
  button = $("<button>", {class : "button color-button", "aria-haspopup":"true",
                        "aria-controls": "dropdown-menu"});
  $("<label>", {style : "background-color : " + filament.color
  + "; width : 50px; height : 24px; border-radius : 2px;border: 1px solid #a7a7a7;"}).appendTo(button);
  $("<span>", {text : filament.name, class : "color-span"}).appendTo(button);
  span = $("<span>", {class : "icon is-small", style : "position: absolute;right: 12px;"});
  $("<i>", {class:"fa fa-angle-down", "aria-hidden" : "true"}).appendTo(span)
  span.appendTo(button);
  trigger.append(button);

  //setup the menu for selection
  dropMenu = $("<div>", {class:"dropdown-menu", id:"dropdown-menu", role:"menu"});

  dropContent = $("<div>", {class:"dropdown-content"});
  var colorToUse = new Object();
  var sectionInfo = new Object();
  if(selectModel === false){
    sectionInfo = getSectionInfo(name);
  } else {
    sectionInfo = getSectionInfo(getModelbyId(name).section);
  }

  if(sectionInfo != undefined && sectionInfo.colorInclude !== undefined){
    for(var i = 0; i < sectionInfo.colorInclude.length; i++){
      colorId = sectionInfo.colorInclude[i];
      colorToUse[colorId] = true;
    }//for
  }//if

  dropMenu.append(dropContent);
  var prevTier = "Standard";
  for(var i = 0; i < allFilaments.length; i++){
    var filament = allFilaments[i];

    //check if you should add color
    if (Object.keys(colorToUse).length > 0 && colorToUse[filament.id] == undefined){
      continue;
    }

    //check if we need to add the menu to it
    if(prevTier != filament.tier){
      // divider = $("<hr>", {class:"dropdown-divider", text:"testing"});
      divider = $("<div>", {class:"color-divider", text:filament.tier});
      dropContent.append(divider);
    }

    //Add color
    if(selectModel == true){
      var click = "selectModelColor('" + name + "', '" + filament.id +"');" +
                  "updateDropdownSelection(this,'" + filament.id + "')";
    } else {
      var click = "selectSectionColor('" + name + "', '" + filament.id +"');"  +
                  "updateDropdownSelection(this,'" + filament.id + "');" +
                  "updateSectionChildren(this,'" + filament.id + "');";
    }
    elementA = $("<div>", {id : filament.id, onclick : click, class: "dropdown-item color-div" , style:"cursor:pointer"});
    dropContent.append(elementA);
    var line = $("<div>", {class : "level is-mobile color-level"});
    elementA.append(line);

    var levelItem = $("<div>", {class : "level-item"});
    line.append(levelItem);
    $("<span>", {class : "icon", style : "background-color : " + filament.color
                  + "; width : 50px; border-radius : 2px; border: 1px solid #a7a7a7;"}).appendTo(levelItem);

    var levelItem = $("<div>", {class : "level-item"});
    line.append(levelItem);
    $("<p>",{class:"color-p", text:filament.name}).appendTo(levelItem);
    $("<img>", {class:"color-image", src:assetUrl+filament.src}).appendTo(line);
    prevTier = filament.tier;
  }
  div.append(dropMenu);
  column.append(div);


  return column;
}

function createBarSection(model, section, addDropDown){
  var line = $("<div>", {class : "columns is-centered",
                         style : "background-color:#dedbdb"});
  var column = $("<div>", {class : "column is-centered"});
  line.append(column);
  $("<h>", {text : section + ":", class : "title is-4 ", id : section+"-title"}).appendTo(column);

  if(addDropDown){
    var dropdown = createDropdown(section, model.colorId, false);
    line.append(dropdown);
  }
  return line;
}

function reshapeData(models){
  var newModels = [];
  placement = {};
  for(var i = 0; i < models.length; i++){
    var model = models[i];
    if( "group" in model){
      if(model.group in placement){
        var pos = placement[model.group];
        newModels[pos].push(model);
      } else {
        placement[model.group] = newModels.length;
        newModels.push([model]);
      }
    } else {
      newModels.push(model);
    }
  }

  return newModels;
}

function createColorChoice(line, model){
  var column = $("<div>", {class : "column"});
  line.append(column);
  $("<p>", {text : model.name + ": ", style : "margin-left : 20px"}).appendTo(column);

  var dropdown = createDropdown(model.id, model.colorId, true);
  line.append(dropdown);
}

function createSection(models, section){
  var div = $("<div>", {class : "column"});

  var sectionLine = createBarSection(models[0], section, true);
  div.append(sectionLine);

  models = reshapeData(models);
 if(models.length > 1) {
    for(var i = 0; i < models.length; i++){
      //check if it array( user has to make a choice)
      if(Array.isArray(models[i])){
        var groupModels = models[i];
        var selectionLine = $("<div>", { class : "columns"});
        var control = $("<div>", { class : "control", style : "padding-left:20px"});

        for(var j = 0; j < groupModels.length; j++){
          var currGModel = groupModels[j];
          var click = "toggleOptions('" + currGModel.id
                                        + "','" + currGModel.group + "');";
          var label = $("<label>", { class : "radio",
                                     onchange : click }).appendTo(control);
          if(currGModel.selected){
            label.html("<input type='radio' name = '" + currGModel.group
                                                      + "'checked> "
                                                      + currGModel.name);
          } else {
            label.html("<input type='radio' name = '" + currGModel.group + "'> "
                                                      + currGModel.name);
          }
          selectionLine.append(control);
        }
        div.append(selectionLine);
        for(var j = 0; j < groupModels.length; j++){
          var currGModel = groupModels[j];
          var line = $("<div>", {class : "columns", id : currGModel.id,
                                 style : "padding-left:20px"});
          createColorChoice(line, currGModel);
          if(currGModel.selected === undefined){
            line.hide();
          }
          div.append(line);
        }
      } else {
        var line = $("<div>", {class : "columns", id : models[i].id});
        createColorChoice(line, models[i]);
        div.append(line);
      }
    }
}

  return div;
}

function toggleOptions(selectedId, groupName){
  var models = getGroupModels(groupName);
  for(var i = 0; i < models.length; i++){
    var currModel = models[i];
    if(currModel.id == selectedId){
      $("#" + currModel.id).show(600);
      showModel(currModel);
    } else {
      $("#" + currModel.id).hide(600);
      hideModel(currModel);
    }
  }

}

function toggleShow(div, sectionName){
  var parentDiv = div.parentNode.parentNode.parentNode;
  var children = parentDiv.childNodes;
  var models = getSectionModels(sectionName);

  for(var i = 1; i < children.length; i++){
    var child = children[i];
    if(child.style.display === "none"){
      // children[i].style.display = "flex";
      $("#" + child.id).show(600);
      showSectionModels(models);
    } else {
      // children[i].style.display = "none";
      $("#" + child.id).hide(600);
      hideSectionModels(models);
    }
  }

}

function  createAddonSection(models, section, div){
  var innerDiv = $("<div>", {class : "column"});
  var line = $("<div>", {class : "columns"});
  var column = $("<div>", {class : "column"});
  line.append(column);
  var click = "toggleShow(this,'" + section +  "');";

  var label = $("<label>", {class : "title is-6 checkbox",
                style : "margin-left : 20px;",
                onchange : click });
  var text = section.split(" - ")[1] + ":";
  label.html("<input type='checkbox'> " + text)

  column.append(label);
  innerDiv.append(line);

  for(var i = 0; i < models.length; i++){
    var line = $("<div>", {class : "columns", id : models[i].id});
    line.hide();
    var column = $("<div>", {class : "column"});
    line.append(column);
    $("<p>", {text : models[i].name + ": ", style : "margin-left : 45px"}).appendTo(column);

    var dropdown = createDropdown(models[i].id, models[i].colorId, true);
    line.append(dropdown);
    innerDiv.append(line);
  }
  div.append(innerDiv);
}

// Looks for insertColorpicker id to insert menu
function createColorPicker(asseturl, blaster){
  assetUrl = asseturl;
  element = document.getElementById("InsertColorpicker");
  sections = breakModelIntoSection(blaster);
  var addons = [];
  for(var section in sections){
    if(section.includes("Addon") == false &&  section != "Supplementary"){
      createSection(sections[section], section).appendTo(element);
    } else if(section.includes("Addon") == true) {
      addons.push(section);
    }
  }

  if(addons.length > 0) {
    var div = $("<div>", {class : "column "});
    var sectionLine = createBarSection(undefined, "Addons", false);
    div.append(sectionLine);
    div.appendTo(element);
    for(var i = 0; i < addons.length; i++){
      var addon = addons[i];
      createAddonSection(sections[addon], addon, div);
    }
  }

  for(var i = 0; i < blaster.sections.length; i++){
    var section = blaster.sections[i];
    if(section["hasCostTier"] && section["hasCostTier"] == true){
     sectoTier[section.section] = i;
     sectionTier.push("Stand")
    }
  }
}

