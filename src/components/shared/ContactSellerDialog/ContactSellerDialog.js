import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Slide,
  Typography,
} from '@mui/material';
import React from 'react';
import useAdminInfo from '../../../customhooks/useAdminInfo';
import {
  initiateAudioCall,
  openWhatsAppChat,
} from '../../../utils/CommonUtils';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ContactSellerDialog({ open, onClose, order }) {
  console.log(order);
  const adminId = order?.lines[0].productVariant.product.customFields.adminId;
  const { adminData, loading: fetchingAdminInfo } = useAdminInfo({ adminId });
  console.log('adminData:', adminData);
  //temp, to remove
  const phoneNumber = '8861382884';

  // const chatWithSeller = () => {
  //   const adminId =
  //     order.lines?.[0]?.productVariant?.product?.customFields?.adminId;
  //   const sellerStoreUrl = `https://urbanahaat.zottr.com/seller/${adminId}`;

  //   const orderItems = order.lines
  //     .map((line) => {
  //       const name = line.productVariant.name;
  //       const quantity = line.quantity;
  //       return `${name} (quantity: ${quantity})`;
  //     })
  //     .join('\n\t'); // clean newline + tab

  //   const formattedTotal = `₹${(order.total / 100).toLocaleString('en-IN')}`;

  //   const orderDate = new Date(order.orderPlacedAt);
  //   const formattedDate = orderDate.toLocaleDateString('en-IN', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //   });
  //   const formattedTime = orderDate.toLocaleTimeString('en-IN', {
  //     hour: 'numeric',
  //     minute: '2-digit',
  //     hour12: true,
  //   });

  //   const fullName =
  //     `${order.customer.firstName} ${order.customer.lastName}`.trim();
  //   const address = order.shippingAddress?.streetLine1 ?? '';
  //   const phone = order.customer?.phoneNumber ?? '';

  //   const inquiryText =
  //     `Hi, I've placed an order on ${sellerStoreUrl} with order id *#${order.id}*.\n` +
  //     `Can you give my order status and expected delivery time?\n\n` +
  //     `*Order ID :* ${order.id}\n` +
  //     `*Order Items :*\n\t${orderItems}\n` +
  //     `*Total Order Amount :* ${formattedTotal}\n` +
  //     `*Order Date & Time :* ${formattedDate} ${formattedTime}\n` +
  //     `*Customer Name :* ${fullName}\n` +
  //     `*Customer Address :* ${address}\n` +
  //     `*Customer Contact Number :* +91${phone}`;

  //   const encodedMessage = encodeURIComponent(inquiryText);
  //   const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;
  //   window.open(whatsappUrl, '_blank');
  // };

  const chatWithSeller = () => {
    const adminId =
      order.lines?.[0]?.productVariant?.product?.customFields?.adminId;
    const sellerStoreUrl = `https://urbanahaat.zottr.com/seller/${adminId}`;

    const orderItems = order.lines
      .map((line) => {
        const name = line.productVariant.name;
        const quantity = line.quantity;
        return `${name} (_quantity_ : ${quantity})`;
      })
      .join('\n');

    const fullName =
      `${order.customer.firstName} ${order.customer.lastName}`.trim();
    const address = order.shippingAddress?.streetLine1 ?? '';
    const phone = order.customer?.phoneNumber ?? '';

    //   const inquiryText =
    //     `Hi, I've placed an order on ${sellerStoreUrl} with order ID *#${order.id}*.\n` +
    //     `Can you give order status and expected delivery time?\n\n` +
    //     `🛍️ *Order Items*\n\n` +
    //     `${orderItems
    //       .split('\n')
    //       .map((item) => `• ${item}`)
    //       .join('\n')}\n\n` +
    //     `📦 *Delivery Details*\n\n` +
    //     `👤 Name: ${fullName}\n` +
    //     `🏠 Address: ${address}\n` +
    //     `📞 Contact: +91${phone}`;

    //   const inquiryText = `
    //   Hi, I've placed an order on ${sellerStoreUrl} with order ID *#${order.id}*.
    //   Can you give order status and expected delivery time?

    //   🛍️ *Order Items*
    //   ------------------
    //   ${orderItems
    //     .split('\n')
    //     .map((item) => `• ${item}`)
    //     .join('\n')}

    //   📦 *Delivery Details*
    //   -----------------------
    //   👤 Name: ${fullName}
    //   🏠 Address: ${address}
    //   📞 Contact: +91${phone}
    // `;

    const inquiryText =
      `Hi, I've placed an order on ${sellerStoreUrl} with order ID *#${order.id}*.\n` +
      `Can you give order status and expected delivery time?\n\n` +
      `🛍️ *Order Items*\n` +
      `------------------\n` +
      `${orderItems
        .split('\n')
        .map((item) => `• ${item}`)
        .join('\n')}\n\n` +
      `🛵 *Delivery Details*\n` +
      `----------------------\n` +
      `👤 _Name_ : ${fullName}\n` +
      `🏠 _Address_ : ${address}\n` +
      `📞 _Contact_ : +91${phone}`;

    openWhatsAppChat(phoneNumber, inquiryText);

    // const encodedMessage = encodeURIComponent(inquiryText);
    // const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;
    // const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${phoneNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    // window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <DialogContent>
        {fetchingAdminInfo && <CircularProgress />}
        {!fetchingAdminInfo && (
          <>
            <Button variant="contained" onClick={() => chatWithSeller()}>
              <Typography variant="button1">Chat With Seller</Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => initiateAudioCall(phoneNumber)}
            >
              <Typography variant="button1">Call Seller</Typography>
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ContactSellerDialog;
