
import React from 'react';
import Column from './column';
import {ColumnContainer} from './style';
import { DragDropContext } from 'react-beautiful-dnd';

class PriceVis extends React.Component {
  onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if(!destination){
      return;
    }
    
    if(destination.droppableId === source.droppableId 
      && destination.index === source.index){
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
    console.log(this.props);
    return(
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >
        <ColumnContainer>
          {this.props.columnOrder.map(columnId =>{
          const column = this.props.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.props.tasks[taskId]);

          return <Column key={column.id} 
                        column={column} 
                        tasks={tasks} 
                        deleteColumn={this.props.deleteColumn} 
                        updateColumnName={this.props.updateColumnName}/>;
          })}
        </ColumnContainer>
      </DragDropContext>
    );
}
}

export default PriceVis;