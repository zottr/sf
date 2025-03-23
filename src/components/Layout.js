// Layout.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import ViewCartSnackbar from '../screens/CartScreen/ViewCartSnackbar';
import CartContext from '../context/CartContext';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { snackMessage, alertOpen, activeOrder } =
    React.useContext(CartContext);
  const location = useLocation();

  const isCartPage = location.pathname === '/cart';

  return (
    <>
      <MainHeader />
      {!isCartPage && (
        <ViewCartSnackbar
          open={alertOpen}
          message={snackMessage}
          activeOrder={activeOrder}
        />
      )}
      <main style={{ marginTop: '90px', marginBottom: '30px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
