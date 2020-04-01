import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools'
import rootReducer from '../reducers';

export default function configureStore() {
  const logger = store => next => action => {
    const result = next(action);
    console.log('next(action): ', result)
    console.log('next state', store.getState())
    
    return result
  }

  const vanillaPromise = store => next => action => {

    if (typeof action.then !== 'function') {
      return next(action)
    }
    return Promise.resolve(action).then(store.dispatch)
  }

  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      // ...错误处理
    }
  };

  const loadState = () => {
    try { // 也可以容错一下不支持localStorage的情况下，用其他本地存储
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      } else {
        return JSON.parse(serializedState);
      }
    } catch (err) {
      // ... 错误处理
      return undefined;
    }
  }
  

  const enhancer = compose(
    applyMiddleware(thunk, logger, vanillaPromise),
    // devTools({
    //   name: "TokenKitWalletRedux",
    //   realtime: true
    // })
  )

  const store = createStore(rootReducer, loadState(), enhancer)


  window.onbeforeunload = (e) => {
    const state = store.getState();
    console.log(88899, state.A.value)

    saveState(state);
  };


  return store;
}