import React from 'react';
import store from './store.js';


export default class Component extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.listenerId = store.addListener(this._handleChange.bind(this));
  }

  componentWillUnmount() {
    store.removeListener(this.listenerId);
  }

  registerFor(items) {
    this.registeredDefaults = items;
    this.state = this._getStateFromStore();
  }

  _getStateFromStore() {
    const state = {};
    Object.keys(this.registeredDefaults).forEach(namespace => {
      state[namespace] = {};
      Object.keys(this.registeredDefaults[namespace]).forEach(key => {
        state[namespace][key] = store.get(namespace, key, this.registeredDefaults[namespace][key]);
      });
    });
    return state;
  }

  _getKeys() {
    const ret = {};
    if(this.registeredDefaults) {
      Object.keys(this.registeredDefaults).forEach(namespace => {
        ret[namespace] = Object.keys(this.registeredDefaults[namespace]);
      })
    }
    return ret;
  }

  _handleChange(state, keys) {
    if (this._hasChange(keys, this._getKeys())) {
      this.setState(this._getStateFromStore());
    }
  }


  _hasChange(keys1, keys2) {
    return Object.keys(keys1).filter(namespace => {
      if (!keys2[namespace]) {
        return false;
      } else {
        return Object.keys(keys1[namespace]).filter(key => keys2[namespace][key] !== undefined).length > 0;
      }
    }).length > 0;
  }
}