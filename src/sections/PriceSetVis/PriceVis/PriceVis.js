
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

class PriceVis extends React.Component {
    State = {
        entities: [],
        selectedTaskIds: [],
        draggingTaskId: null,
    };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
      </DragDropContext>
    );
  }
}

export default PriceVis;