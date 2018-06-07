import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'; /* eslint-disable-line */
import App from './components/App';

const HMRApp = hot(module)(App);

ReactDOM.render(
  (process.env.NODE_ENV === 'development' ? <HMRApp /> : <App />),
  document.getElementById('app'),
);
