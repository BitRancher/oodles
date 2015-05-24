import React from '../../react';
import C from 'js-csp';

import O from '../../oni';

import Store from './store';
import Commands from './demo-store';
import App from './app';


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



function renderFromStore(store){
  var Page = store.get('currentPage');
  React.render(<Page store={store} />, document.getElementById('root'));
}

Store.setChangeCallback(store => {
  console.log(store.toJS());
  renderFromStore(store);
});

Commands.registerPageList([Page1, Page2, Page3]);

renderFromStore(Store.query());


Commands.switchPage();

window.c = {};
for (var key in Commands){
  window.c[key] = Commands[key];
}
