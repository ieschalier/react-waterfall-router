import React from 'react'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

export class Switch extends React.Component {
  state = {
    pathname: history.location.pathname,
  }

  componentDidMount = () => {
    this.unlisten = history.listen(({ pathname }) => {
      this.setState({ pathname })
    })
  }

  componentWillUnmount = () => {
    this.unlisten()
  }

  render() {
    const { pathname } = this.state
    const { children } = this.props

    const Component = children.find(C => (
      C.type === Route && C.props.path === pathname
    ))

    const RedirectComponent = children.find(C => (
      C.type === Redirect
    ))

    return Component || RedirectComponent || null
  }
}

export class Route extends React.Component {
  state = {
    pathname: history.location.pathname,
  }

  componentDidMount = () => {
    this.unlisten = history.listen(({ pathname }) => {
      this.setState({ pathname })
    })
  }

  componentWillUnmount = () => {
    this.unlisten()
  }

  render() {
    const { path, children } = this.props
    const { pathname } = this.state
    return path === pathname && children
  }
}

export class Redirect extends React.Component {
  componentDidMount = () => {
    history.push(this.props.to)
  }

  render() {
    return null
  }
}

export const Link = ({ to, children }) => (
  <a
    href={to}
    onClick={(e) => {
      e.preventDefault()
      history.push(to)
    }}
  >
    {children}
  </a>
)
