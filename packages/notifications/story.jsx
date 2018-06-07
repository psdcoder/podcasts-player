import React from 'react';
import { storiesOf } from '@storybook/react';
import '../global-styles';
import Grid from '../grid';
import Button from '../button';
import Portal from '../portal';
import notify, { NotificationsContainer } from './index';

import './story.pcss';

storiesOf('Notifications', module)
  .add('Examples', () => (
    <Grid>
      <Grid.Row>
        <Grid.Col sm="6">
          <Button size="small" theme="secondary" onClick={() => notify('Default message')}>Default message</Button>
          <Button size="small" theme="secondary" onClick={() => notify('Success message', 'success')}>Success message</Button>
          <Button size="small" theme="secondary" onClick={() => notify('Error message', 'error')}>Error message</Button>
          <Button size="small" theme="secondary" onClick={() => notify('Without timer', { timeout: false })}>Without timer</Button>
          <Button size="small" theme="secondary" onClick={() => notify('With action', { actionText: 'Alert!', actionCallback: () => alert('Hello!') })}>With action</Button>
        </Grid.Col>
        <Grid.Col sm="6">
          <Portal rootClassName="story-notifications__container">
            <NotificationsContainer />
          </Portal>
        </Grid.Col>
      </Grid.Row>
    </Grid>
  ));
