import React from 'react';
import OrderHistoryHeader from '../screens/OrderHistory/OrderHistoryHeader';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from '../components/Footer';
import { Link as RouterLink } from 'react-router-dom';

function OrderHistory() {
  const orders = [
    {
      date: '6 June 2024 @ 10:30AM',
      seller: 'Burger King',
      sellerLogo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--1MJsy7_DWpEDHBVdc8L7Vn-neqF-M_MyA&s',
      price: '₹870',
    },
    {
      date: '30 February 2023 @ 7:00PM',
      seller: 'McDonalds',
      sellerLogo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/McDonald%27s_square_2020.svg/800px-McDonald%27s_square_2020.svg.png',
      price: '₹560',
    },
    {
      date: '15 September 2022 @ 9:30PM',
      seller: 'Cafe Coffee Day',
      sellerLogo:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyV4B4HOamDGePiuPDAzu18iNtaoCPztisAw&s',
      price: '₹350',
    },
    {
      date: '18 November 2021 @ 11:30AM',
      seller: 'Subway',
      sellerLogo:
        'https://image.similarpng.com/very-thumbnail/2020/06/Logo-subway-transparent-background-PNG.png',
      price: '₹650',
    },
    {
      date: '6 June 2024 @ 3:30AM',
      seller: 'Jain Shikanji',
      sellerLogo:
        'https://pbs.twimg.com/profile_images/1476131121255501824/9BDveCTU_400x400.jpg',
      price: '₹900',
    },
  ];

  return (
    <>
      <OrderHistoryHeader />
      <Stack
        direction="column"
        gap={2}
        sx={{
          marginTop: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {orders.map((order, index) => (
          <>
            {/* <RouterLink to="/" style={{ textDecoration: 'none' }}> */}
            <Card
              component={RouterLink}
              to="/"
              variant=""
              sx={{
                width: '95%',
                borderRadius: '10px',
                backgroundColor: 'transparent',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt={order.seller}
                    src={order.sellerLogo}
                    variant="square"
                  />
                }
                title={order.seller}
                titleTypographyProps={{ color: 'black', fontWeight: '500' }}
                subheader={order.date}
                subheaderTypographyProps={{ color: 'grey', fontSize: '14px' }}
                action={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      marginRight: '10px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'black',
                        fontWeight: '500',
                        fontSize: '17px',
                      }}
                    >
                      {order.price}
                    </Typography>
                    <IconButton aria-label="order details">
                      <ChevronRightIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                }
              />
            </Card>
            {/* </RouterLink> */}
            <Divider flexItem variant="middle" sx={{ opacity: 0.7 }} />
          </>
        ))}
      </Stack>
      <Footer />
    </>
  );
}

export default OrderHistory;
