import React from 'react';
import { setGlobalError } from '../../context/ErrorContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details (optional)
    console.error('Error Boundary Caught an Error:', error, errorInfo);

    // Notify user via global error popup
    setGlobalError({
      message: 'Something went wrong! Please try refreshing the page.',
      onRetry: () => window.location.reload(), // Example retry action
    });
  }

  render() {
    if (this.state.hasError) {
      // Optionally, show a fallback UI
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
