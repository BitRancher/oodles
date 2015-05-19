import React from 'react';

import O from '../../oni';

export default class OniTest extends React.Component {

  render(){
    return <O oniRoot={true} oniTW={2} oniTH={3}>
      <O oniTW={2} oniTH={1}>
        <O>a</O>
        <O>b</O>
        <O>c</O>
        <O>d</O>
      </O>
      <O>2</O>
      <O>3</O>
      <O>4</O>
      <O>5</O>
      <O>6</O>
    </O>;
  }

};
