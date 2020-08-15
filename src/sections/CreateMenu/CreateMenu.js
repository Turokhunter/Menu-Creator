import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import {HeaderSizing, BodySizing, FootSizing} from './style';
import useWindowDimensions from '../getWindow';


const CreateMenu = ({data,
                     handleAdd,
                     handleUpdate,
                     handleUpdatingTagOrder,
                     handleClickDeleteTag,
                     handleClickAddTag,
                     handleClickDeleteOption,
                     handleUpdatingOptionOrder,
                     handleClickDuplicateOption}) => {
   const { height, width } = useWindowDimensions();
   console.log(height);
  return (
    <>
      <HeaderSizing>
        <Header handleAdd = {handleAdd}/>
      </HeaderSizing>
      <BodySizing height={height+"px"}>
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
      </BodySizing>
      <FootSizing>
        <Footer data = {data}/>
      </FootSizing>
    </>
  )
}

export default CreateMenu;
