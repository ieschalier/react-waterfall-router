import React from 'react'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export const waterfallMiddelware = (store, self) => {
  console.warn(store, self)
  return (action, args) => {
    console.warn(self)
    console.warn(action, args)
  }
}

export const push = path => {
  history.push(path)
}

export const pop = () => {
  history.goBack()
}

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
    const { children } = this.props

    const Component = children.find(
      C => C.type === Route && C.props.path === pathname,
    )

    const RedirectComponent = children.find(C => C.type === Redirect)

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

    return path === pathname && React.cloneElement(children, { pathname })
  }
}

export class Redirect extends React.Component {
  componentDidMount = () => {
    push(this.props.to)
  }

  render() {
    return null
  }
}

export const Link = ({ to, children }) => (
  <a
    href={to}
    onClick={e => {
      e.preventDefault()
      push(to)
    }}
  >
    {children}
  </a>
)
