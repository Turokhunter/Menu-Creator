import React from 'react';
import Task from './task'
import {Droppable} from 'react-beautiful-dnd';

import {RowContainer, Title, TaskList} from './style';

export default class Column extends React.Component {
  render(){
    return(
      <RowContainer>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id }>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </RowContainer>
    );
  }

}