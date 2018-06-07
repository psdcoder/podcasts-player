import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EventEmitter from './ee';
import uuid from './uuid';
import Notification from './Notification';

export const emitter = new EventEmitter();

export default class NotificationsContainer extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.func,
    showMax: PropTypes.number,
  }

  static defaultProps = {
    className: undefined,
    children: data => data.message,
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

    this.setState(state => ({ notifications: [...state.notifications, { id, ...notificationData }] }));
  }

  _removeNotification = (id, height) => this.setState(
    state => ({
      notifications: state.notifications.filter(n => n.id !== id),
      lastRemovedHeight: height,
    }),
    () => {
      if (this._delayedNotifications.length > 0) {
        this._pushNotification(this._delayedNotifications.shift());
      }
    },
  )

  _getOffsets = () => {
    const offsets = [];

    return this._notificationHeights.reduce((acc, current, i) => {
      if (i !== 0) {
        acc.push(acc[i - 1] + current)
      }



      return acc;
    }, [0]);
  }

  render() {
    const { className, children } = this.props;
    const { notifications, lastRemovedHeight } = this.state;

    return (
      <div className={className}>
        {notifications.map((notification, index) => (
          <Notification
            index={index}
            data={notification}
            key={notification.id}
            baseOffset={}
            onDestroy={height => this._removeNotification(notification.id, height)}
          >
            {notificationPrivate => children(notification, notificationPrivate)}
          </Notification>
        ))}
      </div>
    );
  }
}
