import {Store} from './store.js';

export default class Dispatcher {
  constructor() {
    this.store = new Store();
    this.services = {};
    this.reducers = {};
    this.actions = [];
  }

  /**
   * registers a reducer
   *
   * a reducer is a trandformer for the current state of the application
   * it retrieves the store object and manipulates it.
   *
   * @param actionType
   * @param reducer a simple function
   */
  addReducer(actionType, reducer) {
    if (!this.reducers[actionType]) {
      this.reducers[actionType] = [];
    }
    this.reducers[actionType].push(reducer);

    return this;
  }

  /**
   * registers a addService
   *
   * a service is responsible for (asynchronous) work like fetching data
   * from the backend
   *
   * @param actionType
   * @param service a simple function
   */
  addService(actionType, service) {
    if (!this.services[actionType]) {
      this.services[actionType] = [];
    }
    this.services[actionType].push(service);

    return this;
  }

  getStore() {
    return this.store;
  }

  dispatch(action) {
    // push it onto the actions stack
    this.actions.push(action);

    // run the responsible service
    if (this.services[action.type]) {
      global.setTimeout(function() {
        this.services[action.type].map(service => service(action, this));
      }.bind(this), 0);
    }
    if (this.reducers[action.type]) {
      global.setTimeout(function() {
        this.reducers[action.type].map(reducer => reducer(action, this.store));
      }.bind(this), 0);
    }

    console.log(action.type, action);
  }
}
