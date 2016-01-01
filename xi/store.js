export default class Store {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  onChange(cb) {
    this.listeners.push(cb);
    return this.listeners.length - 1;
  }

  removeListener(id) {
    delete this.listeners[id];
  }

  getState() {
    return this.state;
  }

  get(key, defaultValue = []) {
    if (this.state[key]) {
      return this.state[key];
    } else {
      return defaultValue;
    }
  }

  transform(obj) {
    this.state = Object.assign({}, this.state, obj);
    this._triggerChange(Object.keys(obj));
  }

  _triggerChange(keys) {
    this.listeners.forEach(function(listener) {
      listener(this.state, keys);
    }.bind(this));
  }
};
