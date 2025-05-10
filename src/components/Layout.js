import React from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import ViewCartSnackbar from '../screens/CartScreen/ViewCartSnackbar';
import CartContext from '../context/CartContext';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  const { snackMessage, alertOpen, activeOrder } =
    React.useContext(CartContext);
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          minHeight: '100vh',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MainHeader />
        {!isCartPage && (
          <ViewCartSnackbar
            open={alertOpen}
            message={snackMessage}
            activeOrder={activeOrder}
          />
        )}
        <main style={{ marginTop: '90px', marginBottom: '30px', flex: 1 }}>
          {children}
        </main>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
