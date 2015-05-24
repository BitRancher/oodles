import React from '../../react';

import O from '../../oni';

import { query, setChangeCallback, Actions } from './demo-store';
//import App from './app';


class Page1 extends React.Component {
  render(){
    return <div>
      <O>
        Page 1
      </O>
    </div>;
  }
}

class Page2 extends React.Component {
  render(){
    return <div>
      Page 2
    </div>;
  }
}

class Page3 extends React.Component {
  render(){
    return <div>
      Page 3
    </div>;
  }
}

class Home extends React.Component {
  render(){
    return <div>
      Home
    </div>;
  }
}


class App extends React.Component {

  render(){
    return <div>
      {this.props.components
      }
    </div>;
  }

}

var pageList = [Page1, Page2, Page3];

Actions.registerPageList(pageList);

const pageCells = pageList.map((P, i) => <O key={i}
  onClick={Actions.selectPage(P)}
>
  <P />
</O>);

const homeNode = <O oniTW={2} oniTH={2}>
  {pageCells}
</O>;

function renderFromStore(store){
  var Page = store.get('currentPage');
  //var


  var sections = [];

  var root = <O oniDev={1}>
    {Page && <O>Insert Page</O>

    }

    {!Page && homeNode}
  </O>;

  React.render(root, document.getElementById('root'));
}

setChangeCallback(store => {
  console.log(store.toJS());
  renderFromStore(store);
});


renderFromStore(query());


//Commands.switchPage();

// add commands to console for development
window.c = {};
for (var key in Actions){
  window.c[key] = Actions[key];
}
