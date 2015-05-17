import React from 'react';

import O from '../../oomph';


export default class RowVsColumn extends React.Component {

  render(){
    return <O cWF={1/2}>
      <O>
        <O>
          1
        </O>
        <O>
          2
        </O>
      </O>

      <O cHF={1/2}>
        <O>
          a
        </O>

        <O>
          b
        </O>
      </O>
    </O>;
  }

}
