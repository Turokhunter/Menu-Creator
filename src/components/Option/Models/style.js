import styled from 'styled-components';
import {Button, Form} from 'react-bootstrap'

export const ModelStyle =  styled.div`
  border:1px solid lightgray;
  border-radius: 8px;
  margin-bottom: 4px;
  background-color:white;
`;

export const ModelCopyStyle =  styled.div`
  border:1px solid lightgray;
  border-radius: 8px;
  margin-bottom: 4px;
  background-color:white;
  height: 250px;
`;

export const ModelList = styled.div`
  padding: 1px;
  transition: background-color 0.2s ease;
  background-color: ${props =>(props.isDraggingOver ? 'skyblue' : 'white')}
`;


export const MyModelH5 = styled.h5 `
  padding-top: 3px;
`;

export const MyModelMenuButton = styled(Button)`
  background-color: transparent;
  border: 0px;
`;

export const MyModelHeader = styled.div `
    border-bottom: 2px solid;
    border-color: gray;
    background: #516892;
    color: white;
    padding-left: 10px;
    border-radius: 5px 5px 0px 0px;
`;

export const MyForm = styled(Form)`
  padding: 2px; 
`