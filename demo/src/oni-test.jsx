import React from 'react';

import O from '../../oni';


export default class OniTest extends React.Component {

  render(){
    return <O oniRoot={1} oniTW={2} oniTH={3} oniCol={1} oniDev={1}>
      <O oniTH={3} oniCol={1}>
        <O style={{ backgroundColor: 'pink' }}>tt</O>
        <O oniH={2}>aaaaa</O>
        <O>bbbbb</O>
        <O>ccccc</O>
        <O oniXOffset={0.2}>ddddd</O>
        <O>ccccc</O>
        <O>ddddd</O>
      </O>

      <O oniTH={2}>
        <O oniW={2}>aaaaa</O>
        <O oniW={2}>bbbbb</O>
        <O oniW={2}>ccccc</O>
        <O oniW={2}>eeeee</O>
        <O>ggggg</O>
        <O>hhhhh</O>
      </O>

      <O>
        <O oniW={2}>3</O>
      </O>
      <O oniH={2}>4</O>
      <O>5</O>
      <O>6</O>
      <O>7</O>
    </O>;
  }

};
