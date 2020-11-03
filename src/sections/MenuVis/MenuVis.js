import React  from 'react';
import {Row, Dropdown, Form} from 'react-bootstrap';
import {MenuColumnSpacing, Menulabel, MenuH3,
        MenuSwatch, MenuLabel, MenuContainer,
        MyRow, MyDropdownToggle, TextWrap,
        MySubsectionRow, SubSectionText, STLMenuSwatch,
        MyCol} from './style';
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



const ColorDropdown = ({colors, selectedColor})=>{
  return (
    <Dropdown>
      <MyDropdownToggle>
          <STLMenuSwatch src={selectedColor !== undefined ? selectedColor.zoom : ""}/>
          <TextWrap>
            {selectedColor !== undefined ? selectedColor.name : ""}
          </TextWrap>
      </MyDropdownToggle>

      <Dropdown.Menu>
        {colors.map((color) => (
          <Dropdown.Item key={color.id} eventKey={color.id}>
            <STLMenuSwatch src={color.zoom}/>
            {color.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

const STLColorSubsection = ({modelGrp, section, selectedFilament, selectedColor}) => {
  if(section.multiSelect === true){
    //addmultiSelect
    return(
      <>
        <div key={`inline-$checkbox`} className="mb-3">
            {modelGrp.map((model)=>(
              <Form.Check key={model.id} inline label={model.name} 
                          type="checkbox" 
                          id={`inline-$checkbox-`+ model.id} 
                          checked={model.selected}
                          readOnly={true}
              />
            ))}
        </div>
        <div style={{paddingLeft:"20px"}}>
          {modelGrp.map((model)=>(
            model.selected === true ? 
            (<MySubsectionRow key={model.id}>
              <MyCol>
                <SubSectionText>{model.name}:</SubSectionText>
              </MyCol>
              <MyCol>
                <ColorDropdown colors={selectedFilament} selectedColor={selectedColor}/>
              </MyCol>
            </MySubsectionRow>)
            : (<></>)
          ))}
        </div>
      </>
    )
  } else { 
    if(modelGrp.length === 1){
      return(
        <MySubsectionRow>
          <MyCol>
            <SubSectionText>{modelGrp[0].name}:</SubSectionText>
          </MyCol>
          <MyCol>
            <ColorDropdown colors={selectedFilament} selectedColor={selectedColor}/>
          </MyCol>
        </MySubsectionRow>
      )
    } else {
      //Add radio buttion selection
      return(
        <>
          <div key={`inline-$radio`} className="mb-3">
          {modelGrp.map((model)=>(
            <Form.Check inline readOnly label={model.name} key={model.id}
                        type="radio" 
                        id={`inline-$radio-`+ model.id} 
                        checked={model.selected}
            />
          ))}
          </div>
          <div style={{paddingLeft:"20px"}}>
          {modelGrp.map((model)=>(
            model.selected === true ? 
            (<MySubsectionRow key={model.id}>
              <MyCol>
                <SubSectionText>{model.name}:</SubSectionText>
              </MyCol>
              <MyCol>
                <ColorDropdown colors={selectedFilament} selectedColor={selectedColor}/>
              </MyCol>
            </MySubsectionRow>)
            : (<></>)
          ))}
        </div>
        </>
      )
    }
  }
}

const SectionMenu = ({option, filament}) => {
  var selectedFilament = getColors(option, filament);
  var models = option.modelSection.models;
  var selectColor = filament.filter( el => {return option.colorId === el.id;});
  var numModels = Object.keys(models).length;
  var modelGroups = [];
  var mapGroup = {};
  for(let [modelId, model] of Object.entries(models)){
    if(model.inGroup === false){
      modelGroups.push([model])
    } else {
      if(mapGroup[model.group] === undefined){
        modelGroups.push([model])
        mapGroup[model.group] = modelGroups.length - 1;
      } else {
        modelGroups[mapGroup[model.group]].push(model);
      }
    }
  }

  return (
    <>
      <MyRow type={"section"}>
        <MyCol>
          <MenuH3>{option.section}:</MenuH3>
        </MyCol>
        <MyCol>
          <ColorDropdown colors={selectedFilament} selectedColor={selectColor[0]}/>
        </MyCol>
      </MyRow>

      {numModels > 1 && modelGroups.map((modelGrp, index) =>(
        <STLColorSubsection 
          key={index}
          modelGrp={modelGrp} 
          section={option}
          selectedFilament={selectedFilament}
          selectedColor={selectColor[0]}
        />
      ))} 
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
  } else if(option.type === 'section'){
    return( <SectionMenu option={option} filament={filament} />)
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
