import I from 'immutable';


var store = I.Map();

var changeCallBack = () => {};

function setChangeCallback(cb){
  changeCallBack = cb;
}

function query(func){
  if (typeof func === 'function'){
    return func(store);
  }

  return store;
}

function update(func){
  if (typeof func === 'function'){
    store = store.update(func);
  }
  changeCallBack(store);
}


export default {
  setChangeCallback,
  query,
  update
};
