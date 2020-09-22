import React from 'react';
import {Form, Col} from 'react-bootstrap'

import LineEdit from './LineEdit';
import Checked from './Checked';



const BasicInfo = ({option, handleUpdate}) => {
  return (
     <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <LineEdit propName={"name"} 
                      propValue={option.name} 
                      label={"Name"} 
                      placeholder={"Name"}
                      handleUpdate={handleUpdate}
                      type={"text"}
                      toolTip={"Name of the option"}
                      />
          </Form.Group>
        </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Checked 
            propName={"priceDiff"} 
            propValue={option.priceDiff} 
            label={"Price Difference"} 
            handleUpdate={handleUpdate}
            toolTip={"Choose if changing the option affect price."}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  )
}

export default BasicInfo;
