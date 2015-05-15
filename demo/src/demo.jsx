import React from 'react';
import O from '../../oomph';


export default class Demo extends React.Component {

  render() {
    var nodes = [];
    for (var i = 0; i < 12; i++){
      nodes.push(<O key={i}>{i}</O>);
    }

    return (
      <O root={true} s={{ flexDirection: 'column' }}
        cHF={1/3} cWF={1/4} cS={{ fontSize: 100 }}
      >
        {nodes}
      </O>
    );
  }

}
