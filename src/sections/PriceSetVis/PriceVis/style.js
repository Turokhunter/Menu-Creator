import styled from 'styled-components';

export const RowContainer = styled.div `
  margin: 8px;
  border:1px solid lightgrey;
  border-radius: 2px;
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
`;
export const TaskList = styled.div `
  padding:8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;
