import React from 'react';
import {Form, Col, DropdownButton, Dropdown} from 'react-bootstrap'
import LineEdit from './LineEdit';
import Checked from './Checked';

const RenderPresetOption = ({option, selection,  handleUpdate}) => {

  if(option.type === 'checkbox'){
    return(
        <Form.Row>
          <Form.Group as={Col} xs={4}>
            <Checked 
            propName={""} 
            propValue={option.optionSelection} 
            label={"Affect"} 
            handleUpdate={handleUpdate}
            toolTip={"Set Preset Value"}
            />
          </Form.Group>
        <Form.Group as={Col}>
          <Checked 
            propName={""} 
            propValue={option.items} 
            label={option.name} 
            handleUpdate={handleUpdate}
            toolTip={""}
            disabled={true}
            />
        </Form.Group>
      </Form.Row>
    )

  } else {//option.type === 'stl' || option.type === 'preset'
    return(<></>);
  }
}

const generatePresetOptions = (options) =>{
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
            presetOptions.push({id: modelId, type:'multiSelect'});
          } else {
            presetOptions.push({id: modelId, type:'group'});
          }
        }
      });
    }
  }
  return presetOptions;
}


const Preset = ({option, options, handleUpdate}) => {
  var optionMap = {}
  for(let i = 0; i < options.length; i++){
    let currOption = options[i];
    optionMap[currOption.id] = currOption;
    if(currOption.type === 'section'){
      var modelOrder = currOption.modelSection.modelOrder;
      for(let j = 0; j < modelOrder.length; j++){
        let modelId = modelOrder[i];
        optionMap[modelId] = currOption.modelSection.models[modelId];
      }
    }
  }
  var presetOptions = generatePresetOptions(options);
  console.log(presetOptions);
  var selectionList = Object.entries(option.optionSelection);
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
        
        <DropdownButton title="Apply Preset to:" variant="outline-primary">
          {presetOptions.map(presetOption =>(
            <Dropdown.Item eventKey={presetOption.id + "." + presetOption.type} >
              {presetOption.id + ":"+optionMap[presetOption.id].name + " " + presetOption.type}
              </Dropdown.Item >
          ))}
        </DropdownButton>

      </Form.Row>
      {selectionList.map(currSelect =>(
        <RenderPresetOption selection={currSelect} option={optionMap[currSelect.id]} handleUpdate={handleUpdate} />
      ))}
     </Form>
  )
}

export default Preset;
