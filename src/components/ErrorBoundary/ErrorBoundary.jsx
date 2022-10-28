import { Component } from 'react';
import { ErrorMessage } from './components';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`ErrorBoundary : ${error}, ${errorInfo}`);
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorMessage />;
    }

    return children;
  }
}
