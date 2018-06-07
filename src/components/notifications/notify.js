import { emitter } from './NotificationsContainer';

const DEFAULTS = {
  onShow: undefined,
  onHide: undefined,
  timeout: 0,
};
const buffer = [];
let containerIsReady = false;

const showNotification = notification => emitter.emit('notificaions:new', notification);

emitter.on('container:ready', () => {
  containerIsReady = true;
  buffer.forEach(showNotification);
});

export default function notify(message, opts = {}) {
  const notification = Object.assign({}, DEFAULTS, { message }, opts);

  if (containerIsReady) {
    showNotification(notification);
  } else {
    buffer.push(notification);
  }
}
