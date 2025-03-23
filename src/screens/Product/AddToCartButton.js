import { Button, Typography, useTheme } from '@mui/material';
import QuantityButton from './QuantityButton';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';

function AddToCartButton({
  productVariantId,
  adminId,
  buttonTextVariant,
  buttonHeight,
}) {
  const theme = useTheme();
  let buttonSx = {
    height: buttonHeight,
  };
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
          buttonHeight={buttonHeight}
          buttonSize="medium"
          labelVariant="button1"
        />
      )}
      {quantity === 0 && (
        <Button
          variant="outlined"
          onClick={handleAdd}
          sx={{
            ...buttonSx,
            width: '100%',
            backgroundColor: 'hsl(84, 100%, 60%)',
            '&:hover': {
              backgroundColor: 'hsl(84, 100%, 60%)',
            },
            '&:focus': {
              backgroundColor: 'hsl(84, 100%, 60%)',
            },
            '&:active': {
              backgroundColor: 'hsl(84, 100%, 60%)',
            },
            color: theme.palette.grey[900],
            borderColor: 'hsl(84, 100%, 60%)',
            borderRadius: '25px',
          }}
        >
          <Typography variant={buttonTextVariant}>Add to cart</Typography>
        </Button>
      )}
    </>
  );
}

export default AddToCartButton;
