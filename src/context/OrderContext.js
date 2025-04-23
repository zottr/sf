import React, { useState, useCallback } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_ORDER_BY_CODE } from '../apollo/server';
import { handleError } from './ErrorContext';
import { isLocalStorageAvailable } from '../utils/CommonUtils';

const GET_ORDER = gql`
  ${GET_ORDER_BY_CODE}
`;

const OrderContext = React.createContext({});

export const OrderProvider = (props) => {
  const [isFetchingOrder, setIsFetchingOrder] = useState(false); // ✅ full loading state

  const [fetchOrderQuery] = useLazyQuery(GET_ORDER, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => {
      handleError(err);
      setIsFetchingOrder(false); // in case of error
    },
  });

  const getSavedOrdersFromLocalStorage = () => {
    return isLocalStorageAvailable()
      ? JSON.parse(localStorage.getItem('orders')) || []
      : [];
  };

  const saveOrder = (newOrder) => {
    const existingOrders = getSavedOrdersFromLocalStorage();
    const isAlreadySaved = existingOrders.some((o) => o.code === newOrder.code);
    if (isLocalStorageAvailable() && !isAlreadySaved) {
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const getOrder = useCallback(
    async (orderCode) => {
      setIsFetchingOrder(true);

      try {
        const ordersFromStorage = getSavedOrdersFromLocalStorage();
        const localOrder = ordersFromStorage.find((o) => o.code === orderCode);

        if (localOrder) {
          return localOrder;
        }

        const response = await fetchOrderQuery({
          variables: { code: orderCode },
        });

        const fetchedOrder = response?.data?.orderByCode;
        if (fetchedOrder && isLocalStorageAvailable()) {
          saveOrder(fetchedOrder);
        }
        return fetchedOrder;
      } finally {
        setIsFetchingOrder(false); // ✅ always unset after done
      }
    },
    [fetchOrderQuery]
  );

  return (
    <OrderContext.Provider
      value={{
        isFetchingOrder, // ✅ full loading state exposed
        getOrder,
        getSavedOrdersFromLocalStorage,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export const OrderConsumer = OrderContext.Consumer;
export default OrderContext;
