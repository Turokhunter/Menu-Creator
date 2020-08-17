import styled from 'styled-components';

export const HeaderSizing = styled.div `
    /* display: flex; */
    /* align-items: center; */
    z-index: 10;
    height: 50px;
    width: 520px;
    border-radius: 3px;
    border-bottom: 2px solid lightgray;
    border-right: 2px solid lightgray;
`;

export const BodySizing = styled.div `
    width : 520px;
    height: ${props => props.height};
    overflow: auto;
    overflow-x:hidden;
`;
export const FootSizing = styled.div `
  display: flex;
  width : 520px;
  align-items: center;
  position: relative;
  z-index: 10;
  height: 60px;
  border-radius: 3px;
  border-top: 2px solid lightgray;
  border-right: 2px solid lightgray;
`;
