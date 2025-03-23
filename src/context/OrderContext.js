import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_ORDER_BY_CODE } from '../apollo/server';
import { handleError } from './ErrorContext';

const GET_ORDER = gql`
  ${GET_ORDER_BY_CODE}
`;

const OrderContext = React.createContext({});

export const OrderProvider = (props) => {
  const [orderCode, setOrderCode] = useState();
  const [order, setOrder] = useState();

  const [fetchOrder, { loading }] = useLazyQuery(GET_ORDER, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => handleError(err),
  });

  useEffect(() => {
    async function fetchOrderAsync() {
      const response = await fetchOrder({
        variables: {
          code: orderCode,
        },
      });
      const orderData = response?.data?.orderByCode;
      setOrder(orderData);
      storeOrderInLocalStorage(orderData);
    }
    //order code is set in order checkout page
    if (orderCode) {
      const ordersFromStorage = getOrdersFromLocalStorage();
      const orderFromStorage = ordersFromStorage?.find(
        (o) => o.code === orderCode
      );
      if (!orderFromStorage) {
        fetchOrderAsync();
      } else {
        setOrder(orderFromStorage);
      }
    }
  }, [orderCode]);

  // Function to store a new order in localStorage
  const storeOrderInLocalStorage = (newOrder) => {
    if (newOrder) {
      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  // Function to retrieve orders from localStorage
  const getOrdersFromLocalStorage = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    return orders;
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrderCode,
        getOrdersFromLocalStorage,
        loading,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export const OrderConsumer = OrderContext.Consumer;
export default OrderContext;
