import React from 'react';

export default class Component extends React.Component {
  constructor() {
    super();
    this.store = xing.dispatcher.getStore();
  }

  componentDidMount() {
    this.listenerId = this.store.onChange(this._handleChange.bind(this));
  }

  componentWillUnmount() {
    this.store.removeListener(this.listenerId);
  }

  registerFor(items) {
    this.keys = Object.keys(items);
    const transformation = {};
    for (let key of this.keys) {
      if (!this.store.get(key, false)) {
        transformation[key] = items[key];
      }
    }
    this.store.transform(transformation);
    this.state = this.store.getState(this.keys);
  }

  _handleChange(state, keys) {
    if (this._intersection(keys, this.keys).length > 0) {
      this.setState(state);
    }
  }

  _intersection(keys1, keys2) {
    return keys1.filter(key => keys2.indexOf(key) > -1)
  }
}