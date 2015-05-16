import React from 'react';

import O from '../../oomph';

import Calendar from './calendar';


const demos = {
  'Calendar': Calendar,
  'Test': 'div'
};

const renderDemoCell = (demoKey, clickHandler) => {
  var demo = React.createElement(demos[demoKey]);
  return <O wF={1/2} hF={1/2} s={{ cursor: 'pointer' }}
    onClick={clickHandler.bind(this, demoKey)} key={demoKey}
  >
    <O hF={10/11}>{demo}</O>
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

export default class Demo extends React.Component {

  static defaultProps = { onDemoClick(){} };

  state = { currentDemo: 'Calendar' };

  render() {
    if (this.state.currentDemo){
      return <O root={true}>
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

        <O hF={16/17}>
          {React.createElement(demos[this.state.currentDemo])}
        </O>
      </O>
    } else {
      return <O root={true}>
        <O e='h1' hF={1/17} dirAlign='center'>Demos</O>
        <O hF={16/17}>
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
