import React from 'react';
import Header from './Header';
import PriceVis from './PriceVis';
import {HeaderSizing, BodySizing} from './style';
import useWindowDimensions from '../getWindow';


const PriceSetVis = ({mapping}) => {
   const { height } = useWindowDimensions();
  return (
    <>
      <HeaderSizing>
        <Header/>
      </HeaderSizing>
      <BodySizing height={(height - 125)+"px"}>
        <PriceVis mapping={mapping} />
      </BodySizing>
    </>
  )
}

export default PriceSetVis;
