import React from 'react';

import O from '../../oomph';


const renderColorBlocks = num => {
  var blocks = [];
  for (var i = 0; i < num; i++){
    blocks.push(<O wF={1/8}
      s={{ backgroundColor: `hsl(${(i/num)*360},50%,90%)` }}
    />);
  }
  return blocks;
};

//const renderRandBlock = () => ;

export default class RowVsColumn extends React.Component {

  static defaultProps = {
    name: 'rowvcol'
  };

  render(){
    return <O>
      <O wF={1/4} s={{ backgroundColor: 'hsl(90,50%,75%)' }} />
      {renderColorBlocks(8)}
      <O hF={1/2} wF={1/4} s={{ backgroundColor: 'hsl(270,50%,75%)' }} />
    </O>;
  }

}
