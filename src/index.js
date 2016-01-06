import ReactDOM from 'react-dom';
import React from 'react';
import Root from './root.react.js';
import { dispatch } from '../xi/dispatcher.js';
import dispatcher from '../xi/dispatcher.js';

dispatcher.addService('CORE:READY', (action, dispatch) => {
  setTimeout(function() {
    dispatch({
      type: 'CORE:MODULES',
      modules: [
        {id: 'core', name: 'Xi', actions: 14, background: true},
        {id: 'home', name: 'Home', actions: 12, current: true},
        {id: 'music', name: 'Music', actions: 4},
        {id: 'film', name: 'Film', actions: 1}
      ]
    })
  }, 3000);
}).addReducer('CORE:MODULES', (action, stateTools) => {
  return stateTools.transform('core', {modules: action.modules});
});

ReactDOM.render(
    <Root/>,
    document.getElementById('xi')
);

dispatch({
  type: 'CORE:READY'
});


