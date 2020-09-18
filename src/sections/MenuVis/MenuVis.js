import React from 'react';
import {Row} from 'react-bootstrap';
import {MenuColumnSpacing, Menulabel, MenuH3, MenuSwatch, MenuLabel, MenuContainer} from './style';
import colorData from "../../data/filament.json"
import {getColors} from "../../components/getColors.js";

const CheckBoxMenu = ({option}) => {
  return (
    <Row>
      <div className="form-check">
        <MenuLabel className="form-chech-label">
          <input type="checkbox" className="form-check-input" />
          {option.name}
        </MenuLabel>
      </div>
    </Row>
  );
}

const DropdownMenu = ({option}) => {
  return (
    <>
      <Row>
        <MenuH3>{option.name}</MenuH3>
      </Row>
      <Row>
        {option.items.map((item) => (
          <MenuColumnSpacing key={item.id} >
            <Menulabel className={option.selected === item.id && "is-selected"}>{item.name}</Menulabel>
          </MenuColumnSpacing>
        ))}
      </Row>
    </>
  );

}

const ColorPickerMenu = ({option, filament}) => {
  var selectedFilament = getColors(option, filament);
  //Have to figure out what is shown and what won't be
  return (
    <>
      <Row>
        <MenuH3>{option.name}{option.colorId !== "" ? ": " + option.colorId : ""}</MenuH3>
      </Row>
      <Row>
        {selectedFilament.map((item) => (
          <MenuColumnSpacing key={item.id} style={{padding:"3.2px"}}>
            <MenuSwatch className={option.colorId === item.id && "is-selected"} src={item.zoom}>
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
  } else {
    return(<></>);
  }
}


const MenuVis = ({data}) => {
    const filament = colorData.filament;
    return (
      <MenuContainer>
      {data.options.map((option) =>(
        <RenderBasedOnType key={option.id} option={option} filament={filament}/>
      ))}
      </MenuContainer>
    )
}

export default MenuVis;
