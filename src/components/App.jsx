import React, { Fragment } from 'react';
import { injectGlobal } from 'emotion';
import NotificationsContainer from './notifications/NotificationsContainer';
import notify from './notifications/notify';
import Layout from './Layout';
import Audio from './Audio';
import range from 'ramda/src/range';

injectGlobal([`
  html,
  body {
    margin: 0;
  }
`]);

function renderBuffered(buffered) {
  if (!buffered) {
    return null;
  }

  const ranges = [];

  for (let i = 0, ii = buffered.length; i < ii; i += 1) {
    ranges.push(`${buffered.start(i)} - ${buffered.end(i)}`);
  }

  return ranges.join(', ');
}

export default function App() {
  const closeHandlers = [];

  return (
    <Layout>
      <Layout.Content>
        <Layout.Sidebar>
          <h1>Logo</h1>
          Sidebar
        </Layout.Sidebar>
        <Layout.Main>
          Main content

          <div style={{ display: 'flex' }}>
            <div style={{ flexBasis: '50%' }}>
              <button
                onClick={() => notify((
                  <div>
                    Some random message ${Math.random()}
                    {range(1, Math.ceil(Math.random() * 5)).map(() => <br key={Math.random()} />)}
                  </div>
                ))}
              >
                Add new notification
              </button>
              <button
                onClick={() => {
                  console.log(range(0, Math.min(2, closeHandlers.length)));
                  range(0, Math.min(2, closeHandlers.length)).forEach(() => {
                    closeHandlers.shift()();
                  });
                }}
              >
                Remove first 2 notifications
              </button>
            </div>
            <div>
              <NotificationsContainer showMax={5}>
                {({ message }, { close }) => {
                  closeHandlers.push(close);

                  return (
                    <Fragment>
                      {message}
                      <button onClick={close}>&times;</button>
                    </Fragment>
                  );
                }}
              </NotificationsContainer>
            </div>
          </div>

          {/* <Audio src="https://aphid.fireside.fm/d/1437767933/1532eacf-ac70-4afc-9432-dbcaaaa28600/7931e02e-65f4-4c88-9dad-ecd5f11c2e6e.mp3#t=0">
            {({
              play,
              pause,
              isPlaying,
              currentTime,
              buffered,
              duration,
              setTime,
            }) => (
              <Fragment>
                <button onClick={play}>Play</button>
                <button onClick={pause}>Pause</button>
                <button onClick={() => setTime(Math.round(currentTime + 10))}>+ 10</button>
                <ul>
                  <li>isPlaying: {isPlaying.toString()}</li>
                  <li>currentTime: {currentTime}</li>
                  <li>buffered: {renderBuffered(buffered)}</li>
                  <li>duration: {duration}</li>
                </ul>
                <div style={{ width: '100%', height: '3px', backgroundColor: '#ccc' }}>
                  <div style={{ width: `${(currentTime / duration) * 100}%`, height: '3px', backgroundColor: 'red' }} />
                </div>
              </Fragment>
            )}
          </Audio> */}
        </Layout.Main>
      </Layout.Content>
      <Layout.Footer>
        Footer
      </Layout.Footer>
    </Layout>
  );
}
