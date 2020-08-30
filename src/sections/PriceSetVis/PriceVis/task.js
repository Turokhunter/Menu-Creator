import React from 'react';
import {Draggable} from 'react-beautiful-dnd'
import {TaskContainer} from './style';


export default class Task extends React.Component {
  render() {
    const newContent = this.props.task.content.split("&");
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index} >
        {(provided, snapshot) => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {newContent.map((line, index) => <>{index=== 0 ? '' : '&'}{line}<wbr key={index}/></>)}
          </TaskContainer>
        )}
      </Draggable>
      );
  }
}