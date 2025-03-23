import React from 'react';
import { Box, CircularProgress } from '@mui/material'; // Ensure these are installed via @mui/material
import CartContext from '../../context/CartContext';
import FilledCart from './FilledCart';
import EmptyCart from './EmptyCart';

function CartScreen() {
  const { activeOrder, modifyItemQtyInCart, removeItemFromCart, loading } =
    React.useContext(CartContext);

  // Handlers
  const handleModifyAdd = (id, quantity) =>
    modifyItemQtyInCart(id, quantity + 1);
  const handleModifyMinus = (id, quantity) =>
    modifyItemQtyInCart(id, quantity - 1);
  const handleRemoveFromCart = (id) => removeItemFromCart(id);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : activeOrder?.lines?.length > 0 ? (
        <FilledCart
          activeOrder={activeOrder}
          addToCart={handleModifyAdd}
          reduceFromCart={handleModifyMinus}
          removeFromCart={handleRemoveFromCart}
          loading={loading}
        />
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
}

export default CartScreen;
