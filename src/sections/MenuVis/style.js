import styled from 'styled-components';
import {Container, Dropdown, Row, Col} from 'react-bootstrap';

export const MenuContainer = styled(Container)`
  padding-top: 40px;
  width: 560px;
  overflow:hidden;
`;

export const MenuLabel = styled.label `
  cursor: pointer;
  display: inline-block;
  line-height: 1.25;
  position: relative;
  font-size: 20px;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 0.75rem;
`;

export const MenuSwatch = styled.img `
  width: 50px;
  border-radius: 10%;
  cursor: pointer;
  padding: 1px;
  border: 2px solid;
  &.is-selected {
    box-shadow: 1px 4px 5px rgba(0,0,0,0.8);
    background-color: #b5c8da;
  }
`;

export const STLMenuSwatch = styled.img `
  width: 42px;
  height: 32px;
  position: relative;
  left: -6px;
  border-radius: 2px;
  border: 1px solid #a7a7a7;
`;

export const MenuH3 = styled.h3 `
  margin: 0px;
  color: #363636;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.125;
  font-family: "Work Sans","HelveticaNeue","Helvetica Neue",sans-serif;
`;

export const SubSectionText = styled.p `
  margin: 0px;
  font-size: 16px;
  font-family: "Work Sans","HelveticaNeue","Helvetica Neue",sans-serif;
  color: #3d4246;
  line-height: 1.5;
`;

export const MenuColumnSpacing = styled.div `
  padding: .75rem;
  padding-left: .25rem;
  padding-right: .25rem;
  display: block;
  font-size: 16px;
  font-family: "Work Sans","HelveticaNeue","Helvetica Neue",sans-serif;
  color: #3d4246;
  line-height: 1.5;
`;

export const Menulabel = styled.label `
  border-radius: 2px;
  float: left;
  min-width: 50px !important;
  height: 35px !important;
  margin: 0;
  border: #ccc 1px solid;
  background-color: #ddd;
  font-size: 13px;
  text-align: center;
  line-height: 35px;
  white-space: nowrap;
  text-transform: uppercase;
  padding: 0 10px;
  cursor: pointer;
  &.is-selected {
    box-shadow: 0px 1px 2px rgba(0,0,0,0.8);
    border-color: transparent;
    background-color: #b5c8da;
  }
`;
export const FootSizing = styled.div `

`;

export const MySubsectionRow = styled(Row)`
  margin-left: 20px;
`;

export const MyRow = styled(Row)`
  ${props => props.type === 'section'
    ? `background-color : lightgray;`
    : `background-color : white;`}
`;

export const MyDropdownToggle = styled(Dropdown.Toggle)`
  width: 208px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  color: black;
  border-color: lightgray;
`;

export const TextWrap = styled.span`
  overflow: hidden;
  width: 125px;
`;

export const MyCol = styled(Col)`
  padding:12px;
`;