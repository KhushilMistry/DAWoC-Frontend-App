import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers';
import logger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default()

export default function configureStore(initialState = {}, history) {
  return createStore(reducer, initialState, compose(applyMiddleware(
    thunk,
    routerMiddleware(history),
    reduxImmutableStateInvariant
  )));
};