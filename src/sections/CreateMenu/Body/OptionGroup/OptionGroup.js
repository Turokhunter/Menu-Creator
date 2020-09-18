import React from 'react';
import "./style.css"
import BasicInfo from '../../../../components/Option/BasicInfo.js'
import Header from '../../../../components/Option/Header.js'
import CheckBox from '../../../../components/Option/CheckBox.js'
import Dropdown from '../../../../components/Option/Dropdown.js'
import ColorPicker from '../../../../components/Option/ColorPicker.js'
import STLWindow from '../../../../components/Option/STLWindow.js'
import {Container} from 'react-bootstrap';


const RenderBasedOnType = ({option, handleUpdate,
                            handleUpdatingTagOrder, handleClickDeleteTag,
                            handleClickAddTag}) => {
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
  }
  // } else if(option.type === 'section'){
    // return( <Section option={option} handleUpdate={handleUpdate} />)
  // } else if(option.type === 'model'){
  //   return( <Model option={option} handleUpdate={handleUpdate} />)
  // }
}

const OptionGroup = ({option, handleUpdate,
                      handleUpdatingTagOrder, handleClickDeleteTag,
                      handleClickAddTag, handleClickDeleteOption,
                      handleClickDuplicateOption}) => {

  return (
    <div className="panel">
      <Header option = {option}
        handleClickDeleteOption = {handleClickDeleteOption}
        handleClickDuplicateOption = {handleClickDuplicateOption}
      />
      <Container style={{paddingTop:"6px"}}>
        <RenderBasedOnType option = {option}
          handleUpdate = {handleUpdate}
          handleUpdatingTagOrder = {handleUpdatingTagOrder}
          handleClickDeleteTag = {handleClickDeleteTag}
          handleClickAddTag = {handleClickAddTag}
         />
       </Container>
    </div>
  )
}

export default OptionGroup;
