import React from 'react';

import O from '../../oomph';

import Calendar from './calendar';


export default class Demo extends React.Component {

  render() {
    return <Calendar />;


    var nodes = [];
    for (var i = 0; i < 12; i++){
      nodes.push(<O key={i}
        s={{ fontSize: 100, alignItems: 'center', justifyContent: 'center' }}
      >
        {i}
      </O>);
    }

    return (
      <O root={true}
        cWF={1} cHF={1/4}
      >
        {nodes}
      </O>
    );
  }

}
