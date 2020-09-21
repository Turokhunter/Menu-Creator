import React from 'react';
import Model from './Model';
import {Droppable, DragDropContext} from 'react-beautiful-dnd';
import {ModelList, MyModelHeader, MyForm, ModelCopyStyle, MyModelH5, MyModelMenuButton,} from './style';
import {Col,  Row} from 'react-bootstrap'
import { GrClose } from 'react-icons/gr';
import { FiCopy } from 'react-icons/fi';

 class Models extends React.Component{
  render(){
    const modelOrder = this.props.option.modelSection.modelOrder;
    const modelSection = this.props.option.modelSection;
    return (
        <DragDropContext onDragEnd={this.props.reorderModels}>
          <Droppable 
            droppableId={this.props.option.id} 
            renderClone={(provided, snapshot, rubric) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                 <ModelCopyStyle>
                  <MyModelHeader>
                    <Row>
                      <Col xs={9}>
                          <MyModelH5>Model:{modelOrder[rubric.source.index]}</MyModelH5>
                      </Col>
                      <Col>
                        {' '}
                        <MyModelMenuButton variant="light" >
                          <FiCopy />
                        </MyModelMenuButton>
                        {' '}
                        <MyModelMenuButton variant="light" >
                          <GrClose />
                        </MyModelMenuButton>
                      </Col>
                    </Row>
                  </MyModelHeader>
                  <MyForm>
                  </MyForm>
                </ModelCopyStyle>
              </div>
            )}
            >
            { (provided, snapshot) => (
              <ModelList 
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {modelOrder.map((modelId, index) => 
                  <Model key={modelId} 
                          index={index} 
                          model={modelSection.models[modelId]} 
                          handleUpdatingModel={(e)=> this.props.handleUpdatingModel(modelId, e)}
                          handleClickDupModel = {this.props.handleClickDupModel}
                          handleDeleteModel = {this.props.handleDeleteModel}
                  />
                )}
                {provided.placeholder}
              </ModelList>
            )}
          </Droppable>
          
        </DragDropContext>
    );
  }
}

export default Models;
