import React, { createContext, useContext, useState } from 'react';
import ErrorPopup from '../components/ErrorHandling/ErrorPopup';

const ErrorContext = createContext();

let globalSetError = () => {};

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  globalSetError = setError;

  const clearError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
      {error && (
        <ErrorPopup
          message={error.message}
          onRetry={error.onRetry}
          onClose={clearError}
        />
      )}
    </ErrorContext.Provider>
  );
};

export const setGlobalError = (error) => {
  if (globalSetError) {
    globalSetError(error);
  }
};

export const handleError = (error) => {
  let errorMessage =
    'An unexpected error occurred. Please refresh page, if issue persists contact our support.';
  console.error(error);
  if (error.networkError) {
    errorMessage = 'Network error. Please check your connection.';
  }
  if (error.graphQLErrors?.some((e) => e.message.includes('Invalid input'))) {
    errorMessage = 'Invalid input. Please check your data.';
  }
  setGlobalError({
    message: errorMessage,
    onRetry: () => window.location.reload(),
  });
};

export const logError = (error) => {
  console.error(error);
};
