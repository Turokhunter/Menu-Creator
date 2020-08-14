import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';


const CreateMenu = ({data,
                     handleAdd,
                     handleUpdate,
                     handleUpdatingTagOrder,
                     handleClickDeleteTag,
                     handleClickAddTag,
                     handleClickDeleteOption,
                     handleUpdatingOptionOrder,
                     handleClickDuplicateOption}) => {
  return (
    <>
      <Header handleAdd = {handleAdd}/>
      <Body
        options = {data.options}
        handleUpdate = {handleUpdate}
        handleUpdatingTagOrder = {handleUpdatingTagOrder}
        handleClickDeleteTag = {handleClickDeleteTag}
        handleClickAddTag = {handleClickAddTag}
        handleClickDeleteOption = {handleClickDeleteOption}
        handleUpdatingOptionOrder = {handleUpdatingOptionOrder}
        handleClickDuplicateOption = {handleClickDuplicateOption}
      />
      <Footer data = {data}/>
    </>
  )
}

export default CreateMenu;
