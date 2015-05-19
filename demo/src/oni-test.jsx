import React from 'react';

import O from '../../oni';

export default class OniTest extends React.Component {

  render(){
    return <O oniRoot={true} oniTW={2} oniTH={3} oniDev={true}>
      <O oniTH={3} style={{ overflowY: 'auto', overflowX: 'auto' }}>
        <O>aaaaa</O>
        <O>bbbbb</O>
        <O>ccccc</O>
      </O>

      <O oniTW={2} oniTH={2}>
        <O>aaaaa</O>
        <O>bbbbb</O>
        <O>ccccc</O>
        <O>ddddd</O>
        <O>eeeee</O>
        <O>fffff</O>
        <O>ggggg</O>
        <O>hhhhh</O>
      </O>

      <O>3</O>
      <O>4</O>
      <O>5</O>
      <O>6</O>
    </O>;
  }

};
