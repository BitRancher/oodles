import C from 'js-csp';
import E from 'ease-component';
import I from 'immutable';

import S from './store';


S.update(()=> I.fromJS({
  currentPage: {},
  prevPage: {},
  nextPage: {},
  pageMap: {}
  //pagePos: 0,
  //newPagePos: -1
}));

var pageMap = I.Map();

var channels = {
  select: {
    page: C.chan(),
    prevPage: C.chan(),
    nextPage: C.chan(),
    home: C.chan()
  }
};


var processes = {

  /*ease(type, transactor){
    var doneChan = C.chan();

    C.go(function*(){
      var start = Date.now();
      var duration = 500;
      var elapsed = 0;

      var animSteps = C.chan();
      var animStep;

      var step = () => {
        if (animStep !== C.CLOSED){
          C.putAsync(animSteps);
          requestAnimationFrame(step);
        }
      }
      step();

      while (elapsed < duration){
        animStep =  yield animSteps;
        var x = E[type](elapsed / duration);
        transactor(x);
        elapsed = Date.now() - start;
      }

      animSteps.close();
      doneChan.close();
    });

    return doneChan;
  },*/

  ease(duration, type = 'outCube'){
    var animSteps = C.chan();
    var easeSteps = C.chan();
    var start = Date.now();
    var elapsed = 0;
    var animStep;

    C.go(function*(){
      while (elapsed < duration){
        requestAnimationFrame(() => {
          C.putAsync(animSteps);
        });
        animStep =  yield animSteps;
        var x = E[type](elapsed / duration);
        C.putAsync(easeSteps, x);
        elapsed = Date.now() - start;
      }

      animSteps.close();
      easeSteps.close();
    });

    return easeSteps;
  },

  easeSeries(duration, transactor, type = 'outCube'){
    var animator = processes.ease(duration, type);
    var step;
    var doneChan = C.chan();

    C.go(function*(){
      while (step !== C.CLOSED){
        var step = yield animator;
        transactor(step);
      }

      C.putAsync(doneChan);
      animator.close();
      doneChan.close();
    });

    return doneChan;
  }

};


var commands = {

  registerPageList(pageList){
    pageList.forEach((p, i) => {
      var prevPage = (i === 0)? pageList[pageList.length - 1]: pageList[i - 1];
      var nextPage = (i === pageList.length - 1)? pageList[0]: pageList[i + 1];

      pageMap = pageMap.set(p, I.Map())
        .setIn([p, 'prevPage'], prevPage)
        .setIn([p, 'nextPage'], nextPage);
    });

    S.update(s =>
      s.set('currentPage', pageList[0])
       .set('prevPage', pageMap.getIn([pageList[0], 'prevPage']))
       .set('nextPage', pageMap.getIn([pageList[0], 'nextPage']))
    );

    console.log(pageMap.toJS());
  },

  switchPage(nextPage = true){
    if (S.query(s => s.get('commandsDisabled'))){
      return;
    }

    var incomingPage = S.query(s => s.get(nextPage? 'nextPage': 'prevPage'));

    S.update(s =>
       s.set('commandsDisabled', true)
        .set('incomingPage', incomingPage)
        .set('prevPage', pageMap.getIn([incomingPage, 'prevPage']) )
        .set('nextPage', pageMap.getIn([incomingPage, 'nextPage']) )
    );

    var doneEvent = processes.easeSeries(1000, x =>
      S.update(s =>
        s.set('pagePos', nextPage? -x: x)
         .set('newPagePos', nextPage? (1-x): (-1+x))
      )
    );

    C.go(function*(){
      yield doneEvent;
      //console.log('done');

      S.update(s =>
        s.set('currentPage', incomingPage)
         .delete('incomingPage').delete('pagePos').delete('newPagePos')
         .set('commandsDisabled', false)
      );
    });
  },

  returnHome(){
    if (S.query('commandsDisabled')){
      return;
    }


  }

};


//commands.switchPage();

export default commands;
