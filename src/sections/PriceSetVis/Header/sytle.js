import styled from 'styled-components';
import {Button} from 'react-bootstrap';

export const Text = styled.div`
  padding-left:5px;
  vertical-align: middle;
  width:125px;
`;

export const VariantAdd = styled.div`
  width:200px;
`

export const LeftSideHeader = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
`;

export const RightSideHeader = styled.div`
  display:flex;
  justify-content: flex-end;
`;

export const MyMenuButton = styled(Button)`
  background-color: transparent;
  color: black;
  border-color: transparent;
`;