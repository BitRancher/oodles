import React from 'react';

import O from '../../oomph';


const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var dayRow = days.map(d =>
  <O wF={1/7} crossAlign='end' dirAlign='center' s={{ padding: 5 }} key={d}>
    {d}
  </O>
);

var dateCells = [];
for (var i = 1; i <= 31; i++){
  dateCells.push(
    <O wF={1/7} hF={1/5} s={{ padding: 5 }} key={i}>
      {i}
    </O>
  );
}

var verticalLine = <O wF={1/7} s={{ borderRight: 'thin solid gray' }} />;
var horizontalLine = <O hF={1/5} s={{ borderBottom: 'thin solid gray' }} />;

export default class Calendar extends React.Component {

  render(){
    return <O>
      <O hF={1/17}>
        {dayRow}
      </O>

      <O hF={16/17} s={{ border: 'thick solid hsl(120,50%,80%)', position: 'relative' }}>
        <O s={{ position: 'absolute' }}>
          {verticalLine}
          {verticalLine}
          {verticalLine}
          {verticalLine}
          {verticalLine}
          {verticalLine}
        </O>

        <O s={{ position: 'absolute' }}>
          {horizontalLine}
          {horizontalLine}
          {horizontalLine}
          {horizontalLine}
        </O>

        {dateCells}
      </O>
    </O>;
  }

}
