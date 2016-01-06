import React from 'react';
import Component from '../xi/component.js';

export default class Navbar extends Component {
  constructor() {
    super();
    this.registerFor({
      core: {
        modules: []
      }
    });
  }

  render() {
    return (
        <nav className="navbar navbar-full navbar-dark bg-primary">
          <a className="navbar-brand" href="#">&Xi; XI</a>

          <div className="nav navbar-nav">
            {this.state.core.modules.filter(module => module.background !== true).map(module => {
              if (module.current) {
                return (
                    <a className="nav-item nav-link active" href="#" key={module.id}>
                      {module.name}
                      <span className="sr-only">(current)</span>
                    </a>
                )
              } else {
                return (
                    <a className="nav-item nav-link" href="#" key={module.id}>
                      {module.name}
                    </a>
                )
              }
            })}
          </div>
        </nav>
    );
  }
}