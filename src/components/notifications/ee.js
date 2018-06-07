export default class EventEmitter {
  _handlers = {};

  on(event, handler) {
    if (!this._handlers[event]) {
      this._handlers[event] = [];
    }

    this._handlers[event].push(handler);

    return () => this._handlers[event].splice(this._handlers[event].indexOf(handler), 1);
  }

  emit(event, data) {
    if (this._handlers[event]) {
      this._handlers[event].forEach(handler => handler(data));
    }
  }
}
