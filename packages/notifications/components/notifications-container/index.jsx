import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import cn from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import NanoEvents from 'nanoevents';
import NotificationMessage from '../notification-message';

import './styles.pcss';

export const emitter = new NanoEvents();
emitter.emit('container:ready');

const ANIMATION_IN = 150;
const ANIMATION_OUT = 250;

export default class NotificationsContainer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    showMax: PropTypes.number,
  }

  static defaultProps = {
    className: undefined,
    showMax: 3,
  }

  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    this._unbind = emitter.on('notificaions:new', this._onNewNotification);
    emitter.emit('container:ready');
  }

  componentWillUnmount() {
    this._unbind();
    this._unbind = null;
  }

  _transitionName = {
    enter: 'notifications-container__message_enter',
    leave: 'notifications-container__message_leave',
    appear: 'notifications-container__message_appear',
  }

  _delayedNotifications = []

  _onNewNotification = (notificationData) => {
    const { showMax } = this.props;
    const { notifications } = this.state;

    if (notifications.length < showMax) {
      this._pushNotification(notificationData);
    } else {
      this._delayedNotifications.push(notificationData);
    }
  }

  _pushNotification = (notificationData) => {
    const id = uuid();

    if (notificationData.timeout && !notificationData.actionText) {
      setTimeout(() => this._hideNotification(id), notificationData.timeout + ANIMATION_IN);
    }

    this.setState(state => ({ notifications: [...state.notifications, { id, ...notificationData }] }));
  }

  _hideNotification = id => this.setState(
    state => ({ notifications: state.notifications.filter(n => n.id !== id) }),
    () => {
      if (this._delayedNotifications.length > 0) {
        setTimeout(() => {
          this._pushNotification(this._delayedNotifications.shift());
        }, ANIMATION_OUT);
      }
    }
  )

  render() {
    const { className } = this.props;
    const { notifications } = this.state;

    return (
      <div
        className={cn(
          'notifications-container',
          className
        )}
      >
        <ReactCSSTransitionGroup
          transitionEnterTimeout={ANIMATION_IN}
          transitionLeaveTimeout={ANIMATION_OUT}
          transitionName={this._transitionName}
        >
          {notifications.map(notification => (
            <NotificationMessage
              actionCallback={notification.actionCallback}
              actionText={notification.actionText}
              key={notification.id}
              onClose={() => this._hideNotification(notification.id)}
              type={notification.type}
            >
              {notification.message}
            </NotificationMessage>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
