import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ReplyIcon from '@mui/icons-material/Reply';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OrderContext from '../../context/OrderContext';
import useAdminInfo from '../../customhooks/useAdminInfo';
import { handleError } from '../../context/ErrorContext';

function OrderDetails() {
  const theme = useTheme();

  const query = useParams();
  const { setOrderCode, order, loading } = useContext(OrderContext);
  const [adminId, setAdminId] = useState();
  const { adminData, loading: adminLoading, error } = useAdminInfo({ adminId });

  useEffect(() => {
    if (query.orderCode) {
      setOrderCode(query.orderCode);
    }
  }, [query, setOrderCode]);

  useEffect(() => {
    let adminIdFromProduct =
      order?.lines[0]?.productVariant?.product?.customFields?.adminId ?? '20';
    if (adminIdFromProduct) {
      setAdminId(adminIdFromProduct);
    }
  }, [order]);

  if (error) {
    return <>{handleError(error)}</>;
  }

  const handleClickForChat = () => {
    const whatsappUrl = `https://wa.me/+91${adminData?.phoneNumber}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAudioCall = () => {
    const audioCallUrl = `tel:+91${adminData?.phoneNumber}`;
    window.open(audioCallUrl, '_blank', 'noopener,noreferrer');
  };

  const sellerName =
    order?.lines[0]?.productVariant?.product?.customFields?.adminName ??
    adminData?.businessName ??
    'Sample Name';

  const date = order?.updatedAt ?? new Date(order?.updatedAt).toDateString;

  return (
    <>
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
      ) : order ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Grid container width="90%" rowSpacing={2}>
            <Grid item xs={2}>
              <Avatar
                alt={sellerName}
                src={adminData?.logo}
                variant="square"
                sx={{ width: '45px', height: '45px' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="h6" noWrap>
                  {sellerName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end" marginTop="5px">
                <ButtonBase
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant="subtitle1">view seller</Typography>
                  <ChevronRightIcon fontSize="small" />
                </ButtonBase>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Stack
                  gap={2}
                  marginTop={2}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  width="90%"
                >
                  {order?.lines?.map((item) => (
                    <>
                      <Grid container columnSpacing={8} rowSpacing={1}>
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Typography variant="subtitle1">
                              {item?.productVariant?.name}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={2}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1.3px solid black',
                              width: '28px',
                              height: '28px',
                              boxSizing: 'border-box',
                            }}
                          >
                            <Typography variant="subtitle2">
                              {item.quantity}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Typography variant="subtitle2">x</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Typography variant="subtitle2">
                              ₹{Number(item.unitPrice ?? 0) / 100}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Typography variant="subtitle2">
                              ₹
                              {Number(item?.quantity * item?.unitPrice ?? 0) /
                                100}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </>
                  ))}
                  <Grid container columnSpacing={8}>
                    <Grid item xs={12}>
                      <Divider
                        flexItem
                        color="grey"
                        sx={{ opacity: '0.4' }}
                        variant="fullWidth"
                      />
                    </Grid>
                    <Grid item xs={7} marginTop={2}>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Typography variant="subtitle1">
                          <b>Grand Total :</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} marginTop={2}>
                      <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                      >
                        <Typography variant="subtitle1">
                          <b>₹{Number(order?.total ?? 0) / 100}</b>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={6} marginTop={3}>
              <Box
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2">Order ID :</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} marginTop={3}>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                  #{order.id}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2">Order Date :</Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                  {date}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2">Delivery Address :</Typography>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.grey[600],
                    minWidth: '0',
                    overflowWrap: 'break-word',
                  }}
                >
                  {order?.shippingAddress?.streetLine1}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2">Phone Number :</Typography>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                alignItems={'center'}
              >
                <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                  {order?.customer?.phoneNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} marginTop={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography variant="b1">
                  <i>Any query related to this order?</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="center">
                <ButtonBase
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                  onClick={handleClickForChat}
                >
                  <Typography variant="button">
                    <u>chat with seller</u>
                  </Typography>
                </ButtonBase>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box display="flex" justifyContent="center">
                <ButtonBase
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                  onClick={handleAudioCall}
                >
                  <Typography variant="button">
                    <u>call seller</u>
                  </Typography>
                </ButtonBase>
              </Box>
            </Grid>
            <Grid item xs={12} marginTop={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography variant="b1">
                  <i>Pay for the order using UPI</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: 'black',
                    fontWeight: '600',
                    border: '1.5px solid black',
                    borderRadius: '40px',
                    width: '60%',
                    height: '50px',
                  }}
                >
                  Make Payment
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} marginTop={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Typography variant="b1">
                  <i>Keep exploring the marketplace :</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RouterLink to={'/'}>
                  <Box display="flex" gap={0.5} marginBottom={'100px'}>
                    <ReplyIcon sx={{ color: 'black' }} />
                    <Typography color="black" variant="subtitle2">
                      continue shopping
                    </Typography>
                  </Box>
                </RouterLink>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography align="center" variant="h6">
          There is no recently placed order. Please refer to order history for
          past order details.
        </Typography>
      )}
    </>
  );
}

export default OrderDetails;
