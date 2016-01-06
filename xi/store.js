let state = {}, keys = {};
const listeners = [];

function addListener(cb) {
  listeners.push(cb);
  return listeners.length - 1;
}


function removeListener(id) {
  delete listeners[id];
}

function get(namespace, key, defaultValue = null) {
  if (state[namespace] && state[namespace][key]) {
    return state[namespace][key];
  } else {
    return defaultValue;
  }
}

function transform(namespace, obj) {
  const newState = Object.assign({}, state);
  newState[namespace] = state[namespace] ? Object.assign({}, state[namespace], obj) : Object.assign({}, obj);
  if(!keys[namespace]) {
    keys[namespace] = [];
  }

  keys[namespace] = keys[namespace].concat(Object.keys(obj));
  return newState;
}

function set(newState) {
  state = newState;
  listeners.forEach(listener => listener(state, keys));
  keys = [];
}

const store = {state, get, set, addListener, removeListener};

export const stateTools = {get, transform};
export default store;
