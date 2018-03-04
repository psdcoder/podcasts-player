import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import { hot } from 'react-hot-loader'; /* eslint-disable-line */

const Panel = styled.section`
  background: blueviolet;
  padding: 30px;
  font-family: sans-serif;
  color: #ffffff;
`;

const App = () => <Panel>Hello World</Panel>;

const HMRApp = hot(module)(App);

ReactDOM.render(
  (process.env.NODE_ENV === 'development' ? <HMRApp /> : <App />),
  document.getElementById('app'),
);
