import store, { stateTools } from './store.js';

const services = {},
      reducers = {},
      actions = [];

const dispatcher =  {
  addReducer(actionType, reducer) {
    if (!reducers[actionType]) {
      reducers[actionType] = [];
    }
    reducers[actionType].push(reducer);

    return dispatcher;
  },

  addService(actionType, service) {
    if (!services[actionType]) {
      services[actionType] = [];
    }
    services[actionType].push(service);

    return dispatcher;
  }
};



export default dispatcher;

export function dispatch(action) {
  // push it onto the actions stack
  actions.push(action);

  // run the responsible service
  if (services[action.type]) {
    setTimeout(function() {
      services[action.type].forEach(service => service(action, dispatch));
    }.bind(this), 0);
  }
  if (reducers[action.type]) {
    setTimeout(function() {
      const newState = reducers[action.type].reduce((prevState, reducer) => reducer(action, stateTools), store.state);
      store.set(newState);
    }.bind(this), 0);
  }
}

