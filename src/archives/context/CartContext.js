// import React, { useEffect, useState } from 'react';

// const CartContext = React.createContext({});

// export const CartProvider = (props) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     try {
//       if (cart.length === 0) {
//         //check if something is present in local storage
//         let storedCart = localStorage.getItem('cart');
//         if (storedCart != null) storedCart = JSON.parse(storedCart);
//         if (storedCart.length > 0) setCart(storedCart);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }, [cart]);

//   function clearCart() {
//     setCart([]);
//     try {
//       localStorage.removeItem('cart');
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   function removeAll(item) {
//     const updatedCart = cart.filter((i) => i.name !== item);
//     try {
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//     } catch (e) {
//       console.log(e);
//     }
//     setCart(updatedCart);
//   }

//   function updateCart(itemName, itemSlug, itemPrice, itemPreview, action) {
//     const existingItem = cart.find(({ name }) => name === itemName);
//     let updatedCart = cart;
//     if (existingItem == null) {
//       if (action === 'add') {
//         if (cart.length === 0) {
//           updatedCart = [
//             {
//               name: itemName,
//               slug: itemSlug,
//               price: itemPrice,
//               preview: itemPreview,
//               quantity: 1,
//             },
//           ];
//         } else {
//           updatedCart = [
//             ...cart,
//             {
//               name: itemName,
//               slug: itemSlug,
//               price: itemPrice,
//               preview: itemPreview,
//               quantity: 1,
//             },
//           ];
//         }
//       }
//     } else {
//       if (action === 'add') {
//         updatedCart = cart.map((item) => {
//           if (item.name === itemName) {
//             return { ...item, quantity: item.quantity + 1 };
//           } else return item;
//         });
//       } else if (action === 'remove') {
//         if (existingItem.quantity === 1) {
//           //remove item from cart
//           updatedCart = cart.filter((item) => item.name !== itemName);
//         } else {
//           //reduce quantity by 1
//           updatedCart = cart.map((item) => {
//             if (item.name === itemName) {
//               return { ...item, quantity: item.quantity - 1 };
//             } else return item;
//           });
//         }
//       }
//     }
//     try {
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//     } catch (e) {
//       console.log(e);
//     }
//     setCart(updatedCart);
//   }

//   return (
//     <CartContext.Provider value={{ cart, updateCart, clearCart, removeAll }}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };
// export const CartConsumer = CartContext.Consumer;
// export default CartContext;
