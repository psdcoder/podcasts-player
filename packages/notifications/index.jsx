import { emitter } from './components/notifications-container';

export { default as NotificationsContainer } from './components/notifications-container';

const DEFAULTS = {
  actionCallback: undefined,
  actionText: undefined,
  timeout: 3000,
  type: undefined,
};
const buffer = [];
let containerIsReady = false;

const showNotification = notification => emitter.emit('notificaions:new', notification);

emitter.on('container:ready', () => {
  containerIsReady = true;
  buffer.forEach(showNotification);
});

export default function notify(message, type, opts = {}) {
  const data = { message };

  if (typeof type === 'object') {
    Object.assign(data, type);
  } else {
    data.type = type;
  }

  if (typeof opts === 'object') {
    Object.assign(data, opts);
  }

  const notification = Object.assign({}, DEFAULTS, data);

  if (containerIsReady) {
    showNotification(notification);
  } else {
    buffer.push(notification);
  }
}
