import React from 'react';
import GridLayout from 'react-grid-layout';
import OptionGroup from './OptionGroup'

const Body = ({options}) => {
  //Create layout variable
  const layout = []
  var currPos = 0;

  for(var i = 0; i < options.length; i++){
    // var option = options[i];
    layout.push({i:i.toString(), x:0, y:currPos, w:1, h:2});
    currPos += 2;
  }

  return (
     <GridLayout className="layout" layout={layout} cols={1} rows = {12} rowHeight={30} width={600}>
     { layout.map((row, index) =>(
        <div key={row.i}>
          <OptionGroup option = {options[index]} />
        </div>
      ))}
     </GridLayout>
  )
}

export default Body;
