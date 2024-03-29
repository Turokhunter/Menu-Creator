import styled from 'styled-components';
import {Button} from 'react-bootstrap';

export const RowContainer = styled.div `
  position:relative;
  margin: 8px;
  border:1px solid lightgrey;
  border-radius: 2px;
  background-color:white;
  min-width: 250px;

  display: flex;
  flex-direction: column;
`;

export const ColumnContainer = styled.div `
  display:flex;
`;

export const TaskContainer = styled.div `
  border:1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom:8 px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
export const Title = styled.h3`
  padding:8px;
  padding-right:40px;
`;
export const TaskList = styled.div `
  padding:8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;


export const ColCloseButton = styled(Button)`
  position:absolute;
  top: 0px;
  right: 0px;
`;

export const OverFlowText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  :hover {
    overflow:visible;
  }
`;