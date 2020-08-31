
import React from 'react';
import Column from './column';
import {ColumnContainer} from './style';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class PriceVis extends React.Component {
  onDragEnd = result => {
    const {destination, source, draggableId, type} = result;
    if(!destination){
      return;
    }
    
    if(destination.droppableId === source.droppableId 
      && destination.index === source.index){
        return;
    }
    
    if(type === 'column'){
      const newColumnOrder = Array.from(this.props.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      this.props.updateColumnOrder(newColumnOrder);
      return;
    }

    const start = this.props.columns[source.droppableId];
    const finish = this.props.columns[destination.droppableId];
    if(start === finish){
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      this.props.updateColumns(newColumn);
      return;
    }
    //moving form one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds, 
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds : finishTaskIds,
    };
    this.props.updateLists(newStart, newFinish);
  }

  render() {
    return(
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => (
            <ColumnContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.columnOrder.map((columnId, index) =>{
              const column = this.props.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.props.tasks[taskId]);

              return <Column key={column.id} 
                            column={column} 
                            tasks={tasks}
                            index={index}  
                            deleteColumn={this.props.deleteColumn} 
                            updateColumnName={this.props.updateColumnName}/>;
              })}
              {provided.placeholder}
            </ColumnContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
}
}

export default PriceVis;