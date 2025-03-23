import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { client } from './apollo/index';
import { CollectionsProvider } from './context/CollectionsContext';
import { CartProvider } from './context/CartContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { OrderProvider } from './context/OrderContext';
import { FavoriteSellerProvider } from './context/FavoriteSellerContext';
import mainTheme from './themes/mainTheme';
import { ErrorProvider } from './context/ErrorContext';
import ErrorBoundary from './components/ErrorHandling/ErrorBoundary';
import { InstallPromptProvider } from './context/InstallPromptContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ErrorProvider>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={mainTheme}>
            <I18nextProvider i18n={i18n}>
              <CollectionsProvider>
                <CartProvider>
                  <OrderProvider>
                    <FavoriteSellerProvider>
                      <InstallPromptProvider>
                        <App />
                      </InstallPromptProvider>
                    </FavoriteSellerProvider>
                  </OrderProvider>
                </CartProvider>
              </CollectionsProvider>
            </I18nextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </ErrorProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
