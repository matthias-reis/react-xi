import React from 'react';

export default class Xi extends React.Component {
  constructor() {
    super();
    this.state = {
      modules: [
        {id: 'core', name: 'Xi', actions: 14, background: true},
        {id: 'home', name: 'Home', actions: 12, current: true},
        {id: 'music', name: 'Music', actions: 4},
        {id: 'film', name: 'Film', actions: 1}
      ]
    }
  }

  render() {
    return (
        <div className="list-group">
            {this.state.modules.map(module => {
              if (module.current) {
                return (
                    <a className="list-group-item active" href="#" key={module.id}>
                      {module.name}
                      <span className="sr-only">(current)</span>
                      <span className="label label-info label-pill pull-xs-right">{module.actions}</span>
                    </a>
                )
              } else {
                return (
                    <a className="list-group-item" href="#" key={module.id}>
                      {module.name}
                      <span className="label label-info label-pill pull-xs-right">{module.actions}</span>
                    </a>
                )
              }
            })}
        </div>
    );
  }
}