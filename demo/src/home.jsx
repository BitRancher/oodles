import React from 'react';

import O from '../../oomph';

import Calendar from './calendar';
import RowVsColumn from './row-vs-column';
import Carousel from './carousel';


const demos = {
  'Calendar': Calendar,
  'Row Vs. Column': RowVsColumn,
  'Carousel': Carousel
};

const renderDemoCell = (demoKey, clickHandler) => {
  var demo = demos[demoKey];
  return <O wF={1/2} hF={1/2} d='column' s={{ cursor: 'pointer' }}
    onClick={clickHandler.bind(this, demoKey)} key={demoKey}
  >
    <O>
      {React.createElement(demo)}
    </O>
    <O hF={1/11} dirAlign='center'>{demoKey}</O>
  </O>;
};

const renderDemos = (demos, clickHandler) => {
  var demoCells = [];
  for (var demoKey in demos){
    demoCells.push(renderDemoCell(demoKey, clickHandler));
  }
  return demoCells;
};

export default class Home extends React.Component {

  static defaultProps = { onDemoClick(){} };

  state = { currentDemo: null };

  render() {
    if (this.state.currentDemo){
      return <O root={true} d='column' pTest={1}>
        <O hF={1/17}>
          <O wF={1/5}>
            <button onClick={()=>{ this.setState({ currentDemo: null }); }}>
              Back
            </button>
          </O>

          <O e='h1' wF={3/5} dirAlign='center' crossAlign='center'>
            {this.state.currentDemo}
          </O>
        </O>

        {/*<O e={demos[this.state.currentDemo]} hF={16/17} test={true} />*/}
        <O>
          {React.createElement(demos[this.state.currentDemo])}
        </O>
      </O>
    } else {
      return <O root={true} d='column'>
        <O e='h1' hF={1/17} dirAlign='center'>Demos</O>
        <O>
          {renderDemos(demos, this._onDemoClick.bind(this))}
        </O>
      </O>;
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.currentDemo !== nextState.currentDemo;
  }

  _onDemoClick(e){
    this.setState({ currentDemo: e });
  }

}
