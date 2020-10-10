import React from 'react';
import Task from './task'
import {Droppable, Draggable} from 'react-beautiful-dnd';
import { GrClose } from 'react-icons/gr';
import {RowContainer, Title, TaskList, ColCloseButton, OverFlowText} from './style';
import EditableLabel from 'react-inline-editing';
import './style.css';

export default class Column extends React.Component {
  render(){
    return(
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
      {(provided)=>(
        <RowContainer
        {...provided.draggableProps}
        ref={provided.innerRef}
        >
          <OverFlowText {...provided.dragHandleProps}>
            
            {this.props.column.taskIds.length}
            {this.props.column.id !== 'unassigned' &&
              <ColCloseButton variant="light" onClick={(e)=>this.props.deleteColumn(this.props.column.id)} >
                <GrClose />
              </ColCloseButton>
            }
          </OverFlowText>
          {this.props.column.id !== 'unassigned'
              ? <EditableLabel 
                  text={this.props.column.title} 
                  labelClassName="VariantTitle" 
                  inputClassName="VariantInput" 
                  onFocusOut={(name)=>this.props.updateColumnName(name, this.props.column.id)}/>
              : <Title>{this.props.column.title}</Title>
            }
          <Droppable droppableId={this.props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.tasks.map((task, index) => (index < 10 ? (<Task key={task.id} task={task} index={index}/>) : (<></>)))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </RowContainer>
      )}
      </Draggable>
    );
  }

}