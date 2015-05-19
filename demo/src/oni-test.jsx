import React from 'react';

import O from '../../oni';

export default class OniTest extends React.Component {

  render(){
    return <O oniRoot={true}>
      <O>ddd</O>
      <O>ddd</O>
      <O>ddd</O>
    </O>;
  }

};
