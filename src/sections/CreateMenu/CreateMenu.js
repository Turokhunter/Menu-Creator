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
                     handleClickDuplicateOption,
                     handleSetPrice,
                     importJson,
                    }) => {
   const { height } = useWindowDimensions();
  return (
    <>
      <HeaderSizing>
        <Header handleAdd = {handleAdd} importJson ={importJson}/>
      </HeaderSizing>
      <BodySizing height={(height - 125)+"px"}>
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
        <Footer data = {data} handleSetPrice = {handleSetPrice}/>
      </FootSizing>
    </>
  )
}

export default CreateMenu;
