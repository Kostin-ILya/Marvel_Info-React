import { Component } from 'react'

import LoadError from '../loadingStatus/LoadError/LoadError'

class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error, info) {
    console.log(error, info)

    this.setState({
      error: true,
    })
  }

  render() {
    if (this.state.error) {
      return <LoadError />
    }

    return this.props.children
  }
}

export default ErrorBoundary
