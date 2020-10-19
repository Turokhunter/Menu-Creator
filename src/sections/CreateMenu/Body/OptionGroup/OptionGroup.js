import React from 'react';
import "./style.css"
import BasicInfo from '../../../../components/Option/BasicInfo.js'
import Header from '../../../../components/Option/Header.js'
import CheckBox from '../../../../components/Option/CheckBox.js'
import Dropdown from '../../../../components/Option/Dropdown.js'
import ColorPicker from '../../../../components/Option/ColorPicker.js'
import STLWindow from '../../../../components/Option/STLWindow.js'
import Section from '../../../../components/Option/Section.js'
import Preset from '../../../../components/Option/Preset.js'
import {Container} from 'react-bootstrap';


const RenderBasedOnType = ({option, options, handleUpdate,
                            handleUpdatingTagOrder, handleClickDeleteTag,
                            handleClickAddTag, reorderModels, handleClickAddModel,
                            handleDeleteModel, handleUpdatingModel,
                            handleClickDupModel, handleAddPresetOption,
                            handleDeletePresetOption, handleUpdatePresetOption}) => {
  if(option.type === 'checkbox'){
    return(<> 
            <BasicInfo option={option} handleUpdate={handleUpdate}/>
            <CheckBox option={option} handleUpdate={handleUpdate} />
          </>
          )
  } else if(option.type === 'dropdown'){
    return(<> 
            <BasicInfo option={option} handleUpdate={handleUpdate}/>
              <Dropdown option={option} handleUpdate={handleUpdate}
                handleUpdatingTagOrder = {handleUpdatingTagOrder}
                handleClickDeleteTag = {handleClickDeleteTag}
                handleClickAddTag = {handleClickAddTag}
              />
           </>)
  } else if(option.type === 'colorpicker'){
    return(<> 
            <BasicInfo option={option} handleUpdate={handleUpdate}/>
              <ColorPicker option={option} handleUpdate={handleUpdate}
                handleUpdatingTagOrder = {handleUpdatingTagOrder}
                handleClickDeleteTag = {handleClickDeleteTag}
                handleClickAddTag = {handleClickAddTag}
              />
            </>)
  } else if(option.type === 'stl'){
    return( <STLWindow option={option} handleUpdate={handleUpdate} />)
  } else if(option.type === 'section'){
    return( <Section option={option} handleUpdate={handleUpdate}
            reorderModels={reorderModels}
            handleUpdatingTagOrder = {handleUpdatingTagOrder}
            handleClickDeleteTag = {handleClickDeleteTag}
            handleClickAddTag = {handleClickAddTag}
            handleClickAddModel={handleClickAddModel}
            handleDeleteModel={handleDeleteModel}
            handleUpdatingModel={handleUpdatingModel} 
            handleClickDupModel = {handleClickDupModel}
            />)
  } else if(option.type === 'preset'){    
    return(<Preset option={option} 
              options={options} 
              handleUpdate={handleUpdate}
              handleAddPresetOption = {handleAddPresetOption}
              handleDeletePresetOption = {handleDeletePresetOption} 
              handleUpdatePresetOption = {handleUpdatePresetOption}
            />)
  }
}

const OptionGroup = ({option, options, handleUpdate,
                      handleUpdatingTagOrder, handleClickDeleteTag,
                      handleClickAddTag, handleClickDeleteOption,
                      handleClickDuplicateOption,
                      reorderModels, handleClickAddModel,
                      handleDeleteModel, handleUpdatingModel,
                      handleClickDupModel, handleAddPresetOption,
                      handleDeletePresetOption, handleUpdatePresetOption}) => {

  return (
    <div className="panel">
      <Header option = {option}
        handleClickDeleteOption = {handleClickDeleteOption}
        handleClickDuplicateOption = {handleClickDuplicateOption}
      />
      <Container style={{paddingTop:"6px"}}>
        <RenderBasedOnType option = {option}
          handleUpdate = {handleUpdate}
          options = {options}
          handleUpdatingTagOrder = {handleUpdatingTagOrder}
          handleClickDeleteTag = {handleClickDeleteTag}
          handleClickAddTag = {handleClickAddTag}
          reorderModels = {reorderModels}
          handleClickAddModel = {handleClickAddModel}
          handleDeleteModel = {handleDeleteModel}
          handleUpdatingModel = {handleUpdatingModel}
          handleClickDupModel = {handleClickDupModel}
          handleAddPresetOption = {handleAddPresetOption}
          handleDeletePresetOption = {handleDeletePresetOption} 
          handleUpdatePresetOption = {handleUpdatePresetOption}
         />
       </Container>
    </div>
  )
}

export default OptionGroup;
