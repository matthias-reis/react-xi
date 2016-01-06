import React from 'react';
import Navbar from './navbar.react.js';
import Aside from './aside.react.js';
import Main from './main.react.js';

export default class Root extends React.Component {
  render() {
    return (
        <div className="xi-application">
          <Navbar active="home"/>
          <main className="container">
            <div className="row">
              <div className="col-sm-8">
                <Main/>
              </div>
              <aside className="col-sm-4">
                <Aside/>
              </aside>
            </div>
          </main>
        </div>
    );
  }
}