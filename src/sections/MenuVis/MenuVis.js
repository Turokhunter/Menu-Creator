import React from 'react';
import {Container, Row, Form} from 'react-bootstrap';
import {MenuColumnSpacing, Menulabel, MenuH3, MenuSwatch} from './style';
import colorData from "../../data/filament.json"

const CheckBoxMenu =  ({option}) => {
  return (
    <Row>
      <Form.Check type="checkbox" label={option.name} />
    </Row>
  );
}

const DropdownMenu =  ({option}) => {
  console.log(option);
  return (
    <>
      <Row>
        <MenuH3>{option.name}</MenuH3>
      </Row>
      <Row>
        {option.items.map((item) => (
          <MenuColumnSpacing>
            <Menulabel className={option.selected === item.id && "is-selected"}>{item.name}</Menulabel>
          </MenuColumnSpacing>
        ))}
      </Row>
    </>
  );

}


const ColorPickerMenu =  ({option, filament}) => {
  //Have to figure out what is shown and what won't be
  console.log(filament);
  return (
    <>
      <Row>
        <h3>{option.name}</h3>
      </Row>
      <Row>
        {filament.map((item) => (
          <MenuColumnSpacing>
            <MenuSwatch src={item.src}>
            </MenuSwatch>
          </MenuColumnSpacing>
        ))}
      </Row>
    </>
  );

}



const RenderBasedOnType = ({option, filament}) => {
  if(option.type === 'checkbox'){
    return( <CheckBoxMenu option={option} />)
  } else if(option.type === 'dropdown'){
    return( <DropdownMenu option={option} />)
  } else if(option.type === 'colorpicker'){
    return( <ColorPickerMenu option={option} filament={filament} />)
  }
}


const MenuVis = ({data}) => {
    const filament = colorData.filament;
    return (
      <Container>
      {data.options.map((option) =>(
        <RenderBasedOnType option={option} filament={filament}/>
      ))}
      </Container>
    )
}

export default MenuVis;
