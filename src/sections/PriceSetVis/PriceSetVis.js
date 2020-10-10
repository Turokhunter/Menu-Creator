import React from 'react';
import Header from './Header';
import PriceVis from './PriceVis';
import {HeaderSizing, BodySizing} from './style';

// 'task-1': {id:'task-1', content: "First one"},
//             'task-2': {id:'task-2', content: "Second one"},
//             'task-3': {id:'task-3', content: "Thrid one"},
//             'task-4': {id:'task-4', content: "Fourth one"},
//             'task-5': {id:'task-5', content: "Fifth one"}
//'task-1', 'task-2', 'task-3', 'task-4', 'task-5'
class PriceSetVis extends React.Component{

  state = {
    mapping : this.props.mapping,
    tasks : {},
    columns: { 'unassigned':{
                id: 'unassigned',
                title: 'Unassigned Variants',
                taskIds:[]
                }
              },
    columnOrder: ['unassigned']
  }

  exportJson = () => {
    if(this.state.columns['unassigned'].taskIds.length > 0){
      alert("There are still some prices not assigned.");
      return;
    }
    this.props.exportJson(this.state.columns);
  }

  addColumns = (variantName) => {
    if(this.state.columns.hasOwnProperty(variantName)){
      alert("Can't use the same varient name.");
      return;
    }
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

  groupVariants = (prices, grouping) => {
    let newColumns = { unassigned : {
      id: 'unassigned',
      title: 'Unassigned Variants',
      taskIds:[]
      }};
    var columnOrder = ["unassigned"];
    var idx = 0;
    var groupMap = {};
    for(const [key] of Object.entries(this.props.mapping)){
      if(!(grouping[idx] in groupMap)){//doesn't exist
        var title = "";
        if(prices[idx] === 0){
          title = "Base";
        } else {
          title = "Add-on: +$" + prices[idx];
        }
        const newColumn = {
        id: title,
        title: title,
        taskIds:[key]
        };

        newColumns[title] = newColumn;
        groupMap[grouping[idx]] = title;
        columnOrder.push(title);
      } else {
        newColumns[groupMap[grouping[idx]]].taskIds.push(key);
      }
      idx++;
    }
    // var prices = Object.entries(groupMap).map(([key, value])=>{return value});
    // console.log(prices.sort());
    console.log("columnons generated");
    this.setState({columns: newColumns,
    columnOrder: columnOrder});
  }

  generateVarient = (type) =>{
    if(type === 'onetoone'){
      this.genereteOnetoOne();
    } else if(type === 'price'){
      let results = this.props.combineSamePrices();
      this.groupVariants(results[0], results[1]);
    } else if(type === 'priceBuckets'){
      let results = this.props.generatePriceBuckets();
      this.groupVariants(results[1], results[2]);
    }
  }
  genereteOnetoOne = () =>{
    const unassigned = this.state.columns.unassigned;
    if(unassigned.taskIds.length){
      const newColumnOrder = this.state.columnOrder.slice();
    
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,          
        },
      };
      unassigned.taskIds.forEach((taskId) => {
        var res = this.state.tasks[taskId].content.split("&");        
        const listName = res.map((item) => {
          const name = item.split("=")[1];
          return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        });
        const newColumn = {
          id: this.state.tasks[taskId].content,
          title: listName.join(" - "),
          taskIds:[this.state.tasks[taskId].id]
        };
        newColumnOrder.push(newColumn.id);
        newState.columns[newColumn.id] = newColumn;
      });
      newState.columns.unassigned.taskIds = [];
      newState.columnOrder = newColumnOrder;
      this.setState(newState);
    }
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
  updateColumnOrder = (newColumnOrder)=>{
    const newState = {
      ...this.state,
      columnOrder:newColumnOrder
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
      for(const [key, column] of Object.entries(this.props.mapping)){
        tasks[key] = {id:key, content:column.easyRead.replace(/ /g,"_")};
        lstTasks.push(key);
      }
 
      this.setState({tasks: tasks});
      const mapping = this.props.mapping;
      if(Object.keys(mapping).length 
          && mapping[Object.keys(mapping)[0]].varient !== undefined){
        let newColumns = { unassigned : {
                                        id: 'unassigned',
                                        title: 'Unassigned Variants',
                                        taskIds:[]
                                        }};
        var columnOrder = ["unassigned"];
        for(const [key, column] of Object.entries(this.props.mapping)){
          const newColumn = {
            id: column.easyRead,
            title: column.varient,
            taskIds:[key]
          };
          newColumns[column.easyRead] = newColumn;
          columnOrder.push(column.easyRead);
        }
        this.setState({columns: newColumns,
                      columnOrder: columnOrder});
      } else {
        let newColumns = {}
        for(const [key, column] of Object.entries(prevState.columns)){
          if(key === "unassigned"){
            newColumns["unassigned"] =  {
              ...prevState.columns.unassigned,
              taskIds : lstTasks.length > 100 ? [] : lstTasks
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
    console.log("Finished adding Tasks");
  }
  
  render(){
    return (
      <>
        <HeaderSizing>
          <Header addColumns={this.addColumns} 
                  exportJson={this.exportJson} 
                  changeHeight={this.props.changeHeight}
                  generateVarient={this.generateVarient}
                  numColumns={Object.entries(this.state.columns).length}
                  />
        </HeaderSizing>
        <BodySizing height={this.props.height + "px"}>
          {this.state.columnOrder.length < 150 ? (<PriceVis tasks={this.state.tasks}
                    columns={this.state.columns}
                    columnOrder={this.state.columnOrder}
                    updateColumns = {this.updateColumns}
                    updateLists ={this.updateLists} 
                    deleteColumn ={this.deleteColumn}
                    updateColumnName = {this.updateColumnName}
                    updateColumnOrder = {this.updateColumnOrder}
                    />):(<> </>)}
        </BodySizing>
      </>
    )
  }
}

export default PriceSetVis;
