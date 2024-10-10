import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

export default (initialState, el) => {
  ReactDOM.hydrate(<App {...initialState} />, el);
};
