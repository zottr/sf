import { Button } from '@mui/material';
import QuantityButton from './QuantityButton';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductQuantity({ productVariantId, adminId }) {
  const {
    activeOrder,
    addItemToCart,
    modifyItemQtyInCart,
    removeItemFromCart,
  } = useContext(CartContext);

  let quantity = 0;
  const productInCart = activeOrder?.lines?.find(
    (orderLine) => orderLine.productVariant.id === productVariantId
  );

  if (productInCart != null) {
    quantity = productInCart.quantity;
  }

  const handleAdd = () => {
    addItemToCart(productVariantId, adminId, false);
  };

  const handleModifyAdd = () => {
    quantity = quantity + 1;
    modifyItemQtyInCart(productInCart?.id, quantity);
  };

  const handleModifyMinus = () => {
    if (quantity > 1) {
      quantity = quantity - 1;
      modifyItemQtyInCart(productInCart?.id, quantity);
    } else {
      quantity = 0;
      removeItemFromCart(productInCart?.id);
    }
  };

  return (
    <>
      {quantity > 0 && (
        <QuantityButton
          quantity={quantity}
          addToCart={handleModifyAdd}
          removeFromCart={handleModifyMinus}
          buttonSize="small"
          labelVariant="button2"
        />
      )}
      {quantity === 0 && (
        <Button
          startIcon={<AddShoppingCartIcon fontSize="large" />}
          variant="contained"
          onClick={handleAdd}
          sx={{
            width: '100%',
            marginY: '10px',
            color: '#fff',
            fontWeight: '700',
            paddingY: '12px',
          }}
        >
          ADD TO CART
        </Button>
      )}
    </>
  );
}

export default ProductQuantity;
