
import styled from 'styled-components';
import {Button, Row, DropdownButton} from 'react-bootstrap'

export const AddAndDelete = styled.div `
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    height: 140px;
    padding: 5px;
`;

export const MyH5 = styled.h5 `
  padding-top: 6px;
`;

export const RadioLabel = styled.label `
  padding-left : 30px;
`;

export const MyRadioPos = styled.div `
  padding-top: 6px;
`;

export const MyMenuButton = styled(Button)`
  background-color: transparent;
  border: 0px;
`;

export const MyHeader = styled.div `
    border-bottom: 2px solid;
    border-color: gray;
    background: #5583d8;
    color: white;
    padding-left: 10px;
    border-radius: 6px 6px 0px 0px;
`;

export const Tag = styled.div `
    position: relative;
    margin: 3px;
    font-size: 13px;
    border: 1px dashed #3b9de9;
    border-radius: 4px;
    padding: 0 8px;
    line-height: 30px;
    color: #666666;
    background: rgba(255, 255, 255, 0.7);
`;

export const PresetTag = styled(Tag)`
  border-color : black;
  padding: 8px 20px 0px 8px;
`;

export const DeleteIcon = styled.img `
    position: absolute;
    top: -1px;
    right: -1px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

export const PresetDeleteIcon = styled(DeleteIcon)`
  width: 20px;
  height: 20px;
`;

export const PresetRow = styled(Row)`
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
    margin-bottom: -10px;
`;

export const ShoworHide = styled.div `
    ${props => props.show === true
    ? `display : block;`
    : `display : none;`}
`;

export const MyDropdown = styled(DropdownButton)`
  display: inline-block;
  position: relative;
`;