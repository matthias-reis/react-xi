import React from 'react';

export default class Xi extends React.Component {
  render() {
    return (
        <div className="xi-application">
          <nav className="navbar navbar-full navbar-dark bg-primary">
            <a className="navbar-brand" href="#">&Xi; XI</a>
            <ul className="nav navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Other</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Third</a>
              </li>
            </ul>
          </nav>
          <main className="container">
            <div className="row">
              <article className="col-sm-8">
                <div className="card">
                  <h1 className="card-title">Reference Implementation</h1>

                  <p className="card-text">
                    Here comes arbitrary data.
                  </p>
                </div>
                <h1>Home</h1>
              </article>
              <aside className="col-sm-4">
                <div className="list-group">
                  <a href="#" className="list-group-item active">
                    core
                    <span className="label label-info label-pill pull-xs-right">14</span>
                  </a>
                  <a href="#" className="list-group-item">
                    home
                    <span className="label label-info label-pill pull-xs-right">5</span>
                  </a>
                  <a href="#" className="list-group-item">
                    other
                    <span className="label label-info label-pill pull-xs-right">5</span>
                  </a>
                  <a href="#" className="list-group-item">
                    third
                    <span className="label label-info label-pill pull-xs-right">5</span>
                  </a>
                </div>
              </aside>
            </div>
          </main>
        </div>
    );
  }
}