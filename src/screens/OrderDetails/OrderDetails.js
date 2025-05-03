import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Container,
  Divider,
  IconButton,
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
import { useNavigate } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { getDateTimeString } from '../../utils/CommonUtils';
import ContactSellerDialog from '../../components/shared/ContactSellerDialog';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ErrorAlert from '../../components/shared/Alerts/ErrorAlert';

function OrderDetails() {
  const theme = useTheme();
  const navigate = useNavigate();

  const query = useParams();
  const { getOrder, isFetchingOrder } = useContext(OrderContext);
  const [order, setOrder] = useState(null);
  const [adminId, setAdminId] = useState();
  const { adminData, loading: adminLoading, error } = useAdminInfo({ adminId });

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (query.orderCode) {
        try {
          const fetchedOrder = await getOrder(query.orderCode);
          setOrder(fetchedOrder);
        } catch (err) {
          console.error('Error fetching order:', err);
        }
      }
    };

    fetchOrder();
  }, [query, getOrder]);

  useEffect(() => {
    if (order != null) {
      let adminIdFromProduct =
        order?.lines[0]?.productVariant?.product?.customFields?.adminId;
      if (adminIdFromProduct) {
        setAdminId(adminIdFromProduct);
      }
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

  const dateObj = order?.updatedAt ?? new Date(order?.updatedAt);

  return (
    <>
      {isFetchingOrder ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <CircularProgress thickness={4.5} size={50} />
        </Box>
      ) : order ? (
        <Container sx={{ mt: 10 }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                sx={{ position: 'absolute', marginLeft: '30px' }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <WestIcon
                  fontSize="medium"
                  sx={{
                    color: 'secondary.main',
                  }}
                />
              </IconButton>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.grey[800],
                textAlign: 'center',
                margin: 'auto',
                width: '100%',
              }}
            >
              Order #{order.id}
            </Typography>
          </Stack>
          <Grid container rowSpacing={2} sx={{ mt: 2 }}>
            <Grid
              item
              container
              rowSpacing={3}
              xs={12}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography variant="label1" noWrap>
                    Seller :
                  </Typography>
                  <Typography
                    onClick={() => navigate(`/seller/${adminId}`)}
                    variant="heavyb1"
                    noWrap
                    sx={{
                      color: 'hsl(217, 79%, 51%)',
                      // textDecoration: 'underline',
                      // textDecorationColor: 'hsl(217, 79%, 51%)',
                    }}
                  >
                    {sellerName}
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                  sx={{
                    width: '90%',
                    height: '3rem',
                    borderRadius: '25px',
                    borderColor: 'secondary.dark',
                    '&:hover, &:focus, &:active': {
                      borderColor: 'secondary.dark',
                    },
                  }}
                >
                  <Typography
                    variant="button2"
                    sx={{ color: 'secondary.dark' }}
                  >
                    Talk to Seller
                  </Typography>
                  <QuestionAnswerIcon
                    sx={{
                      color: 'info.main',
                      ml: '8px',
                      fontSize: '24px',
                    }}
                  />
                </Button>
              </Grid>
              {/* <Grid
                item
                xs={4}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  variant="outlined"
                  onClick={handleAudioCall}
                  sx={{
                    width: '90%',
                    height: '3rem',
                    borderRadius: '25px',
                    borderColor: theme.palette.grey[500],
                  }}
                >
                  <Typography variant="button2" color={theme.palette.grey[700]}>
                    Call
                  </Typography>
                  <PhoneIcon
                    sx={{
                      color: 'hsl(217, 79%, 65%)',
                      ml: '8px',
                      fontSize: '22px',
                    }}
                  />
                </Button>
              </Grid> */}
              <Grid
                item
                xs={6}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  onClick={() => {
                    navigate(`/seller/${adminId}/payments`);
                  }}
                  variant="outlined"
                  sx={{
                    width: '90%',
                    height: '3rem',
                    borderRadius: '25px',
                    borderColor: 'secondary.dark',
                    '&:hover, &:focus, &:active': {
                      borderColor: 'secondary.dark',
                    },
                  }}
                >
                  <Typography
                    variant="button2"
                    sx={{ color: 'secondary.dark' }}
                  >
                    UPI Payments
                  </Typography>
                  <CurrencyRupeeIcon
                    sx={{
                      color: 'green',
                      ml: '8px',
                      fontSize: '24px',
                    }}
                  />
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Stack
                gap={2}
                marginTop={2}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                width="90%"
              >
                {order?.lines?.map((item) => (
                  <Grid container rowSpacing={1} sx={{ width: '100%' }}>
                    <Grid item xs={12}>
                      <Typography
                        variant="heavyb2"
                        color={theme.palette.grey[900]}
                      >
                        {item.productVariant?.name}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Grid
                        item
                        xs={8}
                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                      >
                        <Stack direction="row">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: '1.3px',
                              borderStyle: 'solid',
                              borderColor: theme.palette.grey[700],
                              minWidth: '1.3rem',
                              minHeight: '1.3rem',
                              boxSizing: 'border-box',
                              padding: '1px',
                            }}
                          >
                            <Typography
                              variant="heavyb2"
                              color={theme.palette.grey[900]}
                            >
                              {item.quantity}
                            </Typography>
                          </Box>
                          <Typography
                            variant="heavyb2"
                            color={theme.palette.grey[900]}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </Typography>
                          <Typography
                            variant="heavyb2"
                            color={theme.palette.grey[700]}
                          >
                            ₹{Number(item.unitPrice ?? 0) / 100}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                      >
                        <Typography
                          variant="heavyb2"
                          color={theme.palette.grey[700]}
                        >
                          ₹{(Number(item.unitPrice ?? 0) / 100) * item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Grid container rowSpacing={1} xs={12}>
                  <Grid item xs={12}>
                    <Divider
                      flexItem
                      variant="fullWidth"
                      color={theme.palette.grey[500]}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="heavyb1"
                      color={theme.palette.grey[900]}
                    >
                      Grand Total
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', justifyContent: 'flex-start' }}
                  >
                    <Typography
                      variant="heavyb1"
                      color={theme.palette.grey[900]}
                    >
                      ₹{Number(order.total ?? 0) / 100}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item container xs={12} rowSpacing={1}>
              <Grid item xs={6} marginTop={3}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="label2">Order ID</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} marginTop={3}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="heavyb2" color={theme.palette.grey[600]}>
                    {order.id}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="label2">Order Date</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="heavyb2" color={theme.palette.grey[600]}>
                    {getDateTimeString(order)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="label2">Customer Name</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="heavyb2"
                    sx={{
                      color: theme.palette.grey[600],
                      minWidth: '0',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {order?.customer?.firstName}&nbsp;
                    {order?.customer?.lastName}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="label2">Phone Number</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="heavyb2" color={theme.palette.grey[600]}>
                    {order?.customer?.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography variant="label2">Delivery Address</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="heavyb2"
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
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box sx={{ mt: 15 }}>
          <ErrorAlert
            title="Order not found"
            description="Couldn't find any valid order for this URL. Check your Order History for past orders."
            variant="standard"
          />
        </Box>
      )}
      <ContactSellerDialog
        open={openDialog}
        onClose={closeDialog}
        order={order}
        admin={adminData}
      />
    </>
  );
}

export default OrderDetails;
