import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';


const CreateMenu = ({data, handleAdd}) => {
  return (
    <>
      <Header handleAdd = {handleAdd}/>
      <Body options = {data.options}/>
      <Footer data = {data}/>
    </>
  )
}

export default CreateMenu;
