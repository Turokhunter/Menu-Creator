import React from 'react';
import {Draggable} from 'react-beautiful-dnd'
import {TaskContainer} from './style';


export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index} >
        {(provided, snapshot) => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </TaskContainer>
        )}
      </Draggable>
      );
  }
}