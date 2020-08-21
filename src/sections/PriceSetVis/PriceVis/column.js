import React from 'react';
import Task from './task'
import {Droppable} from 'react-beautiful-dnd';
import { GrClose } from 'react-icons/gr';
import {RowContainer, Title, TaskList, ColCloseButton} from './style';
import EditableLabel from 'react-inline-editing';
import './style.css';

export default class Column extends React.Component {
  render(){
    return(
      <RowContainer>
        <div>
          {this.props.column.id !== 'unassigned'
            ? <EditableLabel 
                text={this.props.column.title} 
                labelClassName="VariantTitle" 
                inputClassName="VariantInput" 
                onFocusOut={(name)=>this.props.updateColumnName(name, this.props.column.id)}/>
            : <Title>{this.props.column.title}</Title>
          }
          
          {this.props.column.id !== 'unassigned' &&
            <ColCloseButton variant="light" onClick={(e)=>this.props.deleteColumn(this.props.column.id)} >
              <GrClose />
            </ColCloseButton>
          }
        </div>
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