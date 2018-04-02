import React, { Component, Fragment } from 'react'
import logo from './logo.svg'
import './App.css'
import { Switch, Route, Redirect, Link } from './Router'

import { Consumer } from './store'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route path="/">
          <Consumer mapStateToProps={state => ({ counter: state.counter })}>
            {({ counter, actions }) => {
              console.log(actions)
              return (
                <div>
                  <button onClick={actions.decrement}>-</button>
                  <p>{counter}</p>
                  <button onClick={actions.increment}>+</button>
                </div>
              )
            }}
          </Consumer>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </Route>
        <Switch>
          <Route path="/">
            <Fragment>
              <div>home</div>
              <Link to="/2">To 2</Link>
            </Fragment>
          </Route>
          <Route path="/2">
            <Fragment>
              <Link to="/3">To 3</Link>
            </Fragment>
          </Route>
          <Route path="/404">
            <Fragment>
              <div>404 Not found</div>
              <Link to="/">Go back to home</Link>
            </Fragment>
          </Route>
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}

export default App
