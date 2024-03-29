import styled from 'styled-components';

export const HeaderSizing = styled.div `
  display:flex;
  align-items:center;
  justify-content:space-between;
  z-index: 10;
  height: 55px;
  border-radius: 3px;
  border-bottom: 2px solid lightgray;
  border-right: 2px solid lightgray;
`;

export const BodySizing = styled.div `
  overflow: auto;
  height: ${props => props.height};
`;
