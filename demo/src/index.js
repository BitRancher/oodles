import React from '../../react';

import O from '../../oni';

import { query, setChangeCallback, Actions } from './demo-store';


class Page1 extends React.Component {
  render(){
    return <O style={{ backgroundColor: 'hsl(0,50%,70%)' }}>
      Page 1
    </O>;
  }
}

class Page2 extends React.Component {
  render(){
    return <O style={{ backgroundColor: 'hsl(90,50%,70%)' }}>
      Page 2
    </O>;
  }
}

class Page3 extends React.Component {
  render(){
    return <O style={{ backgroundColor: 'hsl(180,50%,70%)' }}>
      Page 3
    </O>;
  }
}


var pageList = [Page1, Page2, Page3];

Actions.registerPageList({
  homePage: Home,
  pageList: pageList
});

var pageCells = pageList.map((P, i) =>
  <O key={i}
    onClick={Actions.selectPage.bind(0, P)}
  >
    <P />
  </O>
);

class Home extends React.Component {
  render(){
    return <O oniTW={2} oniTH={2} style={{ border: 'thick solid black' }}>
      {pageCells}
    </O>;
  }
}

const renderTopNav = (disabled, yOffset) => <O oniTW={3}>
  <O oniE='button' onClick={Actions.returnHome}>
    Home
  </O>
</O>;

const renderBottomNav = (disabled, yOffset) => <O oniTW={5}>
  <O oniE='button' onClick={Actions.switchPage.bind(0, false)}>
    Previous
  </O>
  <O oniX={4} oniE='button' onClick={Actions.switchPage}>
    Next
  </O>
</O>;

function renderFromStore(store){
  var Page = store.get('currentPage');
  var NewPage = store.get('incomingPage');

  var root = <O oniDev={1} style={{ overflow: 'hidden' }}>

    {Page && <O oniTH={9} oniCol={1} oniY={store.get('pageY')}>
      {renderTopNav()}

      <O oniH={7} style={{ overflow: 'hidden' }} >
        {Page && <O oniX={store.get('pageX')}>
          <Page />
        </O>}

        {NewPage && <O oniX={store.get('newPageX')} >
          <NewPage />
        </O>}
      </O>

      {renderBottomNav()}
    </O>}

    {store.get('showHome') && <O oniX={0} oniY={store.get('homeY')}
      style={{ backgroundColor: 'white' }}
    >
      <Home />
    </O>}
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
