import React from 'react';

import O from '../../oomph';


const slides = ['aaa','bbb','ccc','ddd'];

const slideNodes = slides.map(s => <O wF={1} hF={1} d='row' key={s}>
  {s}
</O>);

export default class Carousel extends React.Component {

  render(){
    return <O>
      <O e='button'>{'<'}</O>

      <O wF={17/19} hF={1}>
        <O wF={4}>
          {slideNodes}
        </O>
      </O>

      <O e='button'>{'>'}</O>
    </O>;
  }

}
