import React from 'react';
import {Form, Col, DropdownButton, Dropdown, InputGroup} from 'react-bootstrap'
import LineEdit from './LineEdit';
import colorData from "../../data/filament.json"
import {getColors} from "../getColors";
import {PresetTag, PresetDeleteIcon, PresetRow, MyDropdown} from './style';
import deleteBtn from '../img/delete.png';

const RenderPresetOption = ({option, selection,  handleUpdate}) => {

  if(selection.type === 'checkbox'){
    return(
      <Form.Group as={Col} md="6">
        <InputGroup size='sm'>
          <InputGroup.Prepend>
              <InputGroup.Text id={selection.id + "Label"}>{"Set"}</InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Checkbox
                  aria-label="option 1"
                  checked = {selection.selected}
                  onChange = {(e) => handleUpdate(selection.id, selection.type, e.target.checked)}
          />
        </InputGroup>
      </Form.Group>
    )
  } else if(selection.type === 'selector'){
    return(
      <Form.Group as={Col}>
        <InputGroup size='sm'>
          <InputGroup.Prepend>
            <InputGroup.Text >Selected:</InputGroup.Text>
          </InputGroup.Prepend>
            <Form.Control as="select" name="selected" onChange={(e) => handleUpdate(selection.id, selection.type, e.target.value)} value ={selection.selected}>
              <option key="-1" value ="-1">{" "}</option>
              {option.items.map((item) =>(
                <option key={item.id} value={item.id} >{item.name}</option>
              ))}
            </Form.Control>
        </InputGroup>
      </Form.Group>
    )
  } else if(selection.type === 'color'){
    const filament = colorData.filament;
    const choices = getColors(option, filament);
    return(
      <Form.Group as={Col}>
        <InputGroup size='sm'>
          <InputGroup.Prepend>
            <InputGroup.Text >Selected:</InputGroup.Text>
          </InputGroup.Prepend>
            <Form.Control as="select" name="selected" onChange={(e) => handleUpdate(selection.id, selection.type, e.target.value)} value ={selection.selected}>
              <option key="-1" value ="-1">{" "}</option>
              {choices.map((item) =>(
                <option key={item.id} value={item.id} >{item.name}</option>
              ))}
            </Form.Control>
        </InputGroup>
      </Form.Group>
    )
  } else if(selection.type === 'group'){
    const choices = Object.entries(option.modelSection.models).filter(pair => pair[1].group === selection.groupName);
    return(
      <Form.Group as={Col}>
        <InputGroup size='sm'>
          <InputGroup.Prepend>
            <InputGroup.Text >Selected:</InputGroup.Text>
          </InputGroup.Prepend>
            <Form.Control as="select" name="selected" onChange={(e) => handleUpdate(selection.id, selection.type, e.target.value)} value ={selection.selected}>
              <option key="-1" value ="-1">{" "}</option>
              {choices.map((item) =>(
                <option key={item[1].id} value={item[1].id} >{item[1].name}</option>
              ))}
            </Form.Control>
        </InputGroup>
      </Form.Group>
    )
  } else if(selection.type === 'multiSelect'){
    const choices = Object.entries(option.modelSection.models).filter(pair => pair[1].group === selection.groupName);
    return(
      <>
        { choices.map((item) =>(
          <Form.Group as={Col} xs='4'>
            <InputGroup size='sm'>
              <InputGroup.Prepend>
                  <InputGroup.Text id={item[1].id + "Label"}>{item[1].name}</InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Checkbox
                      aria-label="option 1"
                      checked = {item[1].id in selection.selected}
                      onChange = {(e) => handleUpdate(selection.id, selection.type, e.target.checked, item[1].id)}
              />
            </InputGroup>
          </Form.Group>
        ))}
      </>
    )
  } else {//option.type === 'stl' || option.type === 'preset'
    return(<></>);
  }
}

const generatePresetOptions = (options, optionSelected) =>{
  var presetOptions = [];

  for(let i = 0; i < options.length; i++){
    let option = options[i];
    if(option.type === 'checkbox'){
      presetOptions.push({id: option.id, type:'checkbox'});
    } else if(option.type === 'colorpicker'){
      presetOptions.push({id: option.id, type:'color'});
    } else if(option.type === 'dropdown'){
      presetOptions.push({id: option.id, type:'selector'});
    } else if(option.type === 'section'){
      presetOptions.push({id: option.id, type:'color'});
      var groupMap = {};
      option.modelSection.modelOrder.map(modelId => { 
        presetOptions.push({id: modelId, type:'color'});
        let model = option.modelSection.models[modelId];
        if(model.inGroup === true && !(model.group in groupMap) ){
          groupMap[model.group] = 1;
          if(option.multiSelect){
            presetOptions.push({id: option.id, type:'multiSelect', groupName:model.group});
          } else {
            presetOptions.push({id: option.id, type:'group', groupName:model.group});
          }
        }
      });
    }
  }
  
  presetOptions = presetOptions.filter(presetOption =>{
    for(var i = 0 ; i < optionSelected.length; i++){
      if(optionSelected[i].id === presetOption.id && presetOption.type === optionSelected[i].type){
        return false;
      }
    }
    return true;
  });

  return presetOptions;
}
const getName = (optionMap, option) => {
 if(option.groupName !== undefined){
    return option.groupName;
  } else if(optionMap[option.id].name === undefined){
    return optionMap[option.id].section;
  } else {
    return optionMap[option.id].name;
  }
}

const Preset = ({option, options, handleUpdate, handleAddPresetOption,
                handleDeletePresetOption, handleUpdatePresetOption}) => {
  var optionMap = {}
  for(let i = 0; i < options.length; i++){
    let currOption = options[i];
    optionMap[currOption.id] = currOption;
    if(currOption.type === 'section'){
      var modelOrder = currOption.modelSection.modelOrder;
      for(let j = 0; j < modelOrder.length; j++){
        let modelId = modelOrder[j];
        optionMap[modelId] = currOption.modelSection.models[modelId];
      }
    }
  }
  var presetOptions = generatePresetOptions(options, option.optionSelection);
  return (
     <Form>
       <Form.Row>
        <Form.Group as={Col}>
          <LineEdit propName={"name"} 
                  propValue={option.name} 
                  label={"Name:"} 
                  placeholder={"Name"}
                  handleUpdate={handleUpdate}
                  type={"text"}
                  toolTip={"Name of the Preset"}
                  />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <LineEdit propName={"filename"} 
                  propValue={option.filename} 
                  label={"Image:"} 
                  placeholder={"Image name"}
                  handleUpdate={handleUpdate}
                  type={"text"}
                  toolTip={"Location of the Image file"}
                  />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        
        <MyDropdown title="Apply Preset to:"  variant="outline-primary" drop={"up"}>
          {presetOptions.map(presetOption =>(
            <Dropdown.Item key={presetOption.id} onSelect={(e) => handleAddPresetOption(presetOption.id, presetOption.type, presetOption.groupName)}  >
              {presetOption.id + ":" + 
               getName(optionMap, presetOption)
              + " " + presetOption.type}
              </Dropdown.Item >
          ))}
        </MyDropdown>

      </Form.Row>
      {option.optionSelection.map(currSelect =>(
        <PresetTag key={currSelect.id}>
          <PresetRow>
           <PresetDeleteIcon
            src={deleteBtn}
            onClick={()=>handleDeletePresetOption(currSelect.id)}
          />
          <Col md="4">
            {currSelect.id + ":" + getName(optionMap, currSelect) }
          </Col>
          
          <RenderPresetOption 
            selection={currSelect} 
            option={optionMap[currSelect.id]} 
            handleUpdate={handleUpdatePresetOption} 
          />
          </PresetRow>
        </PresetTag>
      ))}
     </Form>
  )
}

export default Preset;
