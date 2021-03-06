import React from 'react';
import Header from './Header';
import PriceVis from './PriceVis';
import {HeaderSizing, BodySizing} from './style';


class PriceSetVis extends React.Component{

  state = {
    mapping : this.props.mapping,
    tasks : {
            'task-1': {id:'task-1', content: "First one"},
            'task-2': {id:'task-2', content: "Second one"},
            'task-3': {id:'task-3', content: "Thrid one"},
            'task-4': {id:'task-4', content: "Fourth one"},
            'task-5': {id:'task-5', content: "Fifth one"}
            },
    columns: { 'unassigned':{
                id: 'unassigned',
                title: 'Unassigned Variants',
                taskIds:['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
                },
                'column-1':{
                  id: 'column-1',
                  title: 'Example 1',
                  taskIds:[]
                },
                'column-2':{
                  id: 'column-2',
                  title: 'Example 2',
                  taskIds:[]
                },
              },
    columnOrder: ['unassigned', 'column-1', 'column-2']
  }

  exportJson = () => {
    if(this.state.columns['unassigned'].taskIds.length > 0){
      alert("There are still some prices not assigned.");
      return;
    }
    this.props.exportJson(this.state.columns);
  }

  addColumns = (variantName) => {
    const newColumn = {
                        id: variantName,
                        title:variantName,
                        taskIds:[]
                      };
    
    const newColumnOrder = this.state.columnOrder.slice();
    newColumnOrder.push(newColumn.id);
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id] : newColumn
      },
      columnOrder: newColumnOrder
    };
    
    this.setState(newState);
  }

  updateLists = (newStart, newFinish) =>{
    const newState = {
    ...this.state,
    columns : {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  }
  updateColumnName = (name, columnId)=>{
    const newColumn = {
      ...this.state.columns[columnId],
      title:name
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [columnId]: newColumn,
      },
    };
    this.setState(newState);
  }
  updateColumns = (newColumn)=>{
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
    this.setState(newState);
  }
  deleteColumn =(columnId)=> {
    const taskIds = Array.from(this.state.columns[columnId].taskIds);
    const newColumnOrder = Array.from(this.state.columnOrder);
    newColumnOrder.splice(newColumnOrder.indexOf(columnId), 1);
    this.setState({columnOrder : newColumnOrder});
    const newColumns = {...this.state.columns};
    const unassigned = this.state.columns.unassigned;
    const updateUnassigned = { ...unassigned,
                                taskIds : unassigned.taskIds.concat(taskIds)};
    delete newColumns[columnId];
    newColumns.unassigned = updateUnassigned;
    this.setState({columns: newColumns});
  }
  componentDidUpdate(prevProps, prevState) {
    // Don't forget to compare states    
    if (this.props.mapping !== prevProps.mapping) {
      var tasks = {};
      var lstTasks = [];
      for(let [key] of Object.entries(this.props.mapping)){
        tasks[key] = {id:key, content:key};
        lstTasks.push(key);
      }
 
      this.setState({tasks: tasks});
      var newColumns = {}
      for(const [key, column] of Object.entries(prevState.columns)){
        if(key === "unassigned"){
          newColumns["unassigned"] =  {
            ...prevState.columns.unassigned,
            taskIds : lstTasks
          }
        } else {
          newColumns[key] = {
            ...column,
            taskIds : []
          }
        }
      }
      this.setState({columns: newColumns});
    }
  }
  render(){
    return (
      <>
        <HeaderSizing>
          <Header addColumns={this.addColumns} exportJson={this.exportJson} changeHeight={this.props.changeHeight}/>
        </HeaderSizing>
        <BodySizing height={this.props.height+"px"}>
          <PriceVis tasks={this.state.tasks}
                    columns={this.state.columns}
                    columnOrder={this.state.columnOrder}
                    updateColumns = {this.updateColumns}
                    updateLists ={this.updateLists} 
                    deleteColumn ={this.deleteColumn}
                    updateColumnName = {this.updateColumnName}
                    />
        </BodySizing>
      </>
    )
  }
}

export default PriceSetVis;
