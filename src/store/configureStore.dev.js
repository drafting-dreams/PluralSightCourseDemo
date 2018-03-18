import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxRecord from 'redux-test-recorder';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const record = reduxRecord({rootReducer});
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, reduxImmutableStateInvariant(),record.middleware)
  );
}
export const recordProps = record.props;
