import React from 'react';
import GridLayout from 'react-grid-layout';
import OptionGroup from './OptionGroup'

const Body = ({options, handleUpdate,
               handleUpdatingTagOrder, handleClickDeleteTag,
               handleClickAddTag, handleClickDeleteOption,
               handleUpdatingOptionOrder, handleClickDuplicateOption}) => {
  //Create layout variable
  const layout = []
  var currPos = 0;

  for(var i = 0; i < options.length; i++){
    var option = options[i];
    var hSize = 4;
    if(option.type === "dropdown"){
      hSize = 9;
    } else if(option.type ==="checkbox"){
      hSize = 5;
    } else if(option.type === "colorpicker"){
      hSize = 10;
    }
    layout.push({i:i.toString(), x:0, y:currPos, w:1, h:hSize});
    currPos += hSize;
  }
  return (
     <GridLayout className="layout" layout={layout}
                 cols={1} rows = {12}
                 rowHeight={35} width={500}
                 isResizable={false}
                 autoSize={true}
                 draggableHandle=".MyDragHandleClassName">
     {layout.map((row, index) =>(
        <div key={row.i}>
          <OptionGroup option={options[index]}
            handleUpdate={(e) => handleUpdate(index, e)}
            handleUpdatingTagOrder = {(e) => handleUpdatingTagOrder(index, e)}
            handleClickDeleteTag = {(e) => handleClickDeleteTag(index, e)}
            handleClickAddTag = {(e) => handleClickAddTag(index, e)}
            handleClickDeleteOption = {handleClickDeleteOption}
            handleClickDuplicateOption = {handleClickDuplicateOption}
           />
        </div>
      ))}
     </GridLayout>
  )
}

export default Body;
