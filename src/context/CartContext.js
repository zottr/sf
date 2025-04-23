import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_TO_CART,
  ADJUST_ITEM_QUANTITY,
  EMPTY_CART,
  GET_ACTIVE_ORDER,
  REMOVE_ITEM_FROM_CART,
} from '../apollo/server';
import { handleError } from './ErrorContext';

const CartContext = React.createContext({});

export const CartProvider = (props) => {
  const [activeOrder, setActiveOrder] = useState();
  const [snackMessage, setSnackMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(activeOrder != null);
  const [cartQuantity, setCartQuantity] = useState();
  const [currentSeller, setCurrentSeller] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [itemBeingModifiedId, setItemBeingModifiedId] = useState('');
  const [itemBeingRemovedId, setItemBeingRemovedId] = useState('');
  const [itemBeingAddedVariantId, setItemBeingAddedVariantId] = useState('');

  const { data, loading, error } = useQuery(GET_ACTIVE_ORDER, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => handleError(err),
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    onError: (err) => handleError(err),
  });
  const [adjustItemQuantity] = useMutation(ADJUST_ITEM_QUANTITY, {
    onError: (err) => handleError(err),
  });
  const [removeFromCart] = useMutation(REMOVE_ITEM_FROM_CART, {
    onError: (err) => handleError(err),
  });
  const [emptyCart] = useMutation(EMPTY_CART, {
    onError: (err) => handleError(err),
  });

  useEffect(() => {
    if (data?.activeOrder) {
      setActiveOrder(data.activeOrder);
    }
  }, [data]);

  useEffect(() => {
    if (activeOrder && activeOrder.totalQuantity > 0) {
      setCartQuantity(activeOrder.totalQuantity);
      setSnackMessage(`${activeOrder.totalQuantity} items in your cart`);
      setAlertOpen(true);
      setCurrentSeller(
        activeOrder?.lines[0]?.productVariant?.product?.customFields?.adminId
      );
    } else {
      setAlertOpen(false);
      setCartQuantity(0);
      setCurrentSeller(undefined);
    }
  }, [activeOrder]);

  async function addItemToCart(variantId, sellerId, skipCheck) {
    setItemBeingAddedVariantId(variantId);
    try {
      if (!skipCheck && currentSeller && currentSeller !== sellerId) {
        setShowWarning(true);
        return;
      }

      const result = await addToCart({
        variables: { variantId, qty: 1 },
      });

      if (result.data.addItemToOrder.__typename !== 'Order') {
        throw new Error(result.data.addItemToOrder.message);
      }
      setActiveOrder(result.data.addItemToOrder);
    } catch (err) {
      console.error('Failed to add item to cart:', err);
      handleError(err);
    } finally {
      setItemBeingAddedVariantId('');
    }
  }

  async function modifyItemQtyInCart(orderLineId, quantity) {
    setItemBeingModifiedId(orderLineId);
    try {
      const result = await adjustItemQuantity({
        variables: { id: orderLineId, qty: quantity },
      });

      if (result.data.adjustOrderLine.__typename !== 'Order') {
        throw new Error(result.data.adjustOrderLine.message);
      }

      setActiveOrder(result.data.adjustOrderLine);
    } catch (err) {
      console.error('Failed to modify item quantity in cart:', err);
      handleError(err);
    } finally {
      setItemBeingModifiedId('');
    }
  }

  async function removeItemFromCart(orderLineId) {
    setItemBeingRemovedId(orderLineId);
    try {
      const result = await removeFromCart({
        variables: { id: orderLineId },
      });

      if (result.data.removeOrderLine.__typename !== 'Order') {
        throw new Error(result.data.removeOrderLine.message);
      }

      setActiveOrder(result.data.removeOrderLine);
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
      handleError(err);
    } finally {
      setItemBeingRemovedId('');
    }
  }

  async function emptyCartItems() {
    try {
      const result = await emptyCart();

      if (result.data.removeAllOrderLines.__typename !== 'Order') {
        throw new Error(result.data.removeAllOrderLines.message);
      }

      setActiveOrder(result.data.removeAllOrderLines);
    } catch (err) {
      console.error('Failed to empty cart items:', err);
      handleError(err);
    }
  }

  async function clearExistingAddNewItems(variantId, sellerId) {
    try {
      setCurrentSeller(sellerId);
      await emptyCartItems();
      await addItemToCart(variantId, sellerId, true); // Skip check because the user confirmed replacement
    } catch (err) {
      console.error('Failed to clear existing and add new items:', err);
      handleError(err);
    }
  }

  if (error) {
    return (
      <div>
        <p>An error occurred while loading your cart.</p>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <CartContext.Provider
      value={{
        activeOrder,
        snackMessage,
        alertOpen,
        cartQuantity,
        showWarning,
        addItemToCart,
        modifyItemQtyInCart,
        removeItemFromCart,
        setActiveOrder,
        setSnackMessage,
        clearExistingAddNewItems,
        setShowWarning,
        loading,
        itemBeingModifiedId,
        itemBeingRemovedId,
        itemBeingAddedVariantId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const CartConsumer = CartContext.Consumer;
export default CartContext;
