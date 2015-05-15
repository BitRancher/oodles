import React from 'react';
import O from '../../oomph';


export default class Demo extends React.Component {
  render() {
    return (
        <O cWH={1/3} s={{ fontSize: 100 }}>
          <O s={{ fontSize: 100 }}>
            1
          </O>
          <O s={{ fontSize: 100 }}>
            2
          </O>
          <O s={{ fontSize: 100 }}>
            3
          </O>
        </O>
    );
  }
}
