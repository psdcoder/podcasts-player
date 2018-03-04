import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import { hot } from 'react-hot-loader'; /* eslint-disable-line */
import mq from 'helpers/styled/mq';

const Panel = styled.section`
  background: blueviolet;
  padding: 30px;
  font-family: sans-serif;
  color: #ffffff;

  ${mq.phone`
    color: blue;
  `}
`;

const App = () => <Panel>Hello World</Panel>;

const HMRApp = hot(module)(App);

ReactDOM.render(
  (process.env.NODE_ENV === 'development' ? <HMRApp /> : <App />),
  document.getElementById('app'),
);
