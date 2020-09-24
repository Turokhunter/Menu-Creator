import React from 'react';
import {Form, Col} from 'react-bootstrap';
import LineEdit from './LineEdit';
import ColorChoices from './ColorChoices';



const ColorPicker = ({option, handleUpdate, handleUpdatingTagOrder,
                      handleClickDeleteTag, handleClickAddTag }) => {
    return (
      <>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
                <LineEdit propName={"price.Prem"}
                          propValue ={option.price.Prem} 
                          label={"Prem:"} 
                          handleUpdate={handleUpdate}
                          type={"Number"}
                          toolTip={"only set if using auto populate variant"}
                          />
              </Form.Group>
              <Form.Group as={Col}>
              <LineEdit propName={"price.UltPrem"}
                        propValue ={option.price.UltPrem} 
                        label={"UltPrem:"} 
                        handleUpdate={handleUpdate}
                        type={"Number"}
                        toolTip={"only set if using auto populate variant"}
                        />
            </Form.Group>
            </Form.Row>
          <ColorChoices option={option} 
                        handleUpdate={handleUpdate}
                        handleUpdatingTagOrder={handleUpdatingTagOrder}
                        handleClickDeleteTag={handleClickDeleteTag}
                        handleClickAddTag={handleClickAddTag}
          />
        </Form>
      </>
    )
}

export default ColorPicker;
