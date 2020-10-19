import React from 'react';
import GridLayout from 'react-grid-layout';
import OptionGroup from './OptionGroup'

const Body = ({options, handleUpdate,
               handleUpdatingTagOrder, handleClickDeleteTag,
               handleClickAddTag, handleClickDeleteOption,
               handleUpdatingOptionOrder, handleClickDuplicateOption,
               reorderModels, handleClickAddModel,
               handleDeleteModel, handleUpdatingModel,
               handleClickDupModel, handleAddPresetOption,
               handleDeletePresetOption, handleUpdatePresetOption}) => {
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
      if(option.colorInclusion === 'all'){
        hSize = 7.2;
      } else {
        hSize = 11.2;
      }
    } else if(option.type === "stl"){
      hSize = 6;
    } else if(option.type === "section"){
      if(option.colorInclusion === 'all'){
        hSize = 8.5;
      } else {
        hSize = 12.5;
      }
      hSize += option.modelSection.modelOrder.length*7;
    } else if(option.type === 'preset'){
      hSize = 4.7;
      console.log(option);
      for(let j = 0; j < option.optionSelection.length; j++){
        let presetOption = option.optionSelection[j];
        if(presetOption.type === 'MultiSelect'){
          hSize += (Object.entries(presetOption).length - 1) % 3;
        } else {
          hSize += 1.1;
        }
      }
    }
    layout.push({i:option.id, x:0, y:currPos, w:1, h:hSize});
    currPos += hSize;
  }
  return (
    <div>
       <GridLayout className="layout" layout={layout}
                   cols={1} rows = {12}
                   rowHeight={35} width={500}
                   isResizable={false}
                   autoSize={true}
                   onLayoutChange= {handleUpdatingOptionOrder}
                   draggableHandle=".MyDragHandleClassName">
       {layout.map((row, index) =>(
          <div key={row.i}>
            <OptionGroup option={options[index]}
              options = {options}
              handleUpdate={(e) => handleUpdate(index, e)}
              handleUpdatingTagOrder = {(e) => handleUpdatingTagOrder(index, e)}
              handleClickDeleteTag = {(e) => handleClickDeleteTag(index, e)}
              handleClickAddTag = {(e) => handleClickAddTag(index, e)}
              handleClickDeleteOption = {handleClickDeleteOption}
              handleClickDuplicateOption = {handleClickDuplicateOption}
              reorderModels = {(e) => reorderModels(index, e)}
              handleClickAddModel = {(e) => handleClickAddModel(index, e)}
              handleDeleteModel = {(e) => handleDeleteModel(index, e)}
              handleUpdatingModel = {(modelId, e) => handleUpdatingModel(index, modelId, e)}
              handleClickDupModel = {(model) => handleClickDupModel(index, model)}
              handleAddPresetOption = {(modifyId, type, groupName) => handleAddPresetOption(index, modifyId, type, groupName)}
              handleDeletePresetOption = {(modifyId) => handleDeletePresetOption(index, modifyId)}
              handleUpdatePresetOption = {(modifyId, type, value, modelId) => handleUpdatePresetOption(index, modifyId, type, value, modelId)}
             />
          </div>
        ))}
       </GridLayout>
     </div>
  )
}

export default Body;
