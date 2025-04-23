import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS_WITH_OPTIONS } from '../../apollo/server';
import DoubleCellLayoutProducts from '../../components/ProuctsDisplay/DoubleCellLayoutProducts';
import useAdminInfo from '../../customhooks/useAdminInfo';
import CallActionButtons from '../../components/common/CallActionButtons';
import FavButton from './FavButton';
import { handleError } from '../../context/ErrorContext';
import { initiateAudioCall, openWhatsAppChat } from '../../utils/utils';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';
import { useNavigate } from 'react-router-dom';
const PRODUCTS_FROM_SELLER = gql`
  ${GET_PRODUCTS_WITH_OPTIONS}
`;

function SellerScreen() {
  const navigate = useNavigate();
  const theme = useTheme();
  const query = useParams();
  const sellerId = query.sellerId;
  const [products, setProducts] = useState();
  const [adminId, setAdminId] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { adminData, loading, error } = useAdminInfo({ adminId });

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const [fetchSellerProducts] = useLazyQuery(PRODUCTS_FROM_SELLER, {
    onError: (err) => handleError(err),
  });

  useEffect(() => {
    let adminIdFromProduct = sellerId;
    if (adminIdFromProduct) {
      setAdminId(adminIdFromProduct);
    }
  }, [sellerId]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchSellerProducts({
        variables: {
          options: { filter: { adminId: { eq: sellerId } } },
        },
      });
      if (response.data) {
        setProducts(response.data?.products?.items);
      }
    }
    if (sellerId) {
      fetchProducts();
    }
  }, [sellerId]);

  if (error) {
    return <>{handleError(error)}</>;
  }

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      {adminData && (
        <>
          <Stack>
            {adminData?.banner != null && adminData?.banner !== '' && (
              <Box
                component="img"
                sx={{
                  height: 'auto',
                  width: '100%',
                }}
                src={adminData?.banner}
              />
            )}
            <Container
              sx={{
                backgroundColor: 'hsl(48 88.2% 99%)',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                // borderRadius: 5,
                borderBottomLeftRadius: '45px',
                borderBottomRightRadius: '45px',
                width: '100%',
                paddingY: 2,
                margin: 'auto',
              }}
            >
              <Stack
                gap={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Stack
                  direction="row"
                  gap={1}
                  sx={{
                    // backgroundColor: 'hsl(48 88.2% 98%)',
                    // borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                  }}
                >
                  <Avatar
                    src={adminData.logo}
                    alt={`${adminData.businessName} Logo`}
                    sx={{
                      width: '42px',
                      height: '42px',
                      padding: 1,
                      boxShadow: '0px 4px 10px rgba(255, 0, 0, 0.1)',
                    }}
                  />
                  <Stack>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        wordBreak: 'break-word',
                      }}
                    >
                      {adminData.businessName}
                    </Typography>
                    <Typography
                      variant="heavyb2"
                      sx={{
                        wordBreak: 'break-word',
                        color: theme.palette.grey[700],
                      }}
                    >
                      {adminData.tagline}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      height: '52px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <FavButton sellerId={adminData.id} />
                  </Box>
                </Stack>
                <Stack
                  gap={1}
                  direction="row"
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={() => openWhatsAppChat(phoneNumber)}>
                    <WhatsAppIcon
                      fontSize="medium"
                      sx={{ color: 'hsl(142.4,70.2%,42.6%)' }}
                    />
                  </IconButton>
                  <IconButton onClick={() => initiateAudioCall(phoneNumber)}>
                    <CallIcon
                      fontSize="medium"
                      sx={{ color: 'hsl(217, 79%, 65%)' }}
                    />
                  </IconButton>
                  <Button
                    variant="outlined"
                    // onClick={toggleDialog}
                    onClick={() => {
                      navigate(`/seller/${query.sellerId}/payments`);
                    }}
                    sx={{
                      height: '2.5rem',
                      borderRadius: '15px',
                      borderColor: theme.palette.grey[500],
                    }}
                  >
                    <CurrencyRupeeIcon
                      fontSize="small"
                      sx={{
                        color: 'hsl(145, 63%, 39%)',
                        mr: 0.5,
                      }}
                    />
                    <Typography
                      variant="button2"
                      color={theme.palette.grey[700]}
                    >
                      Payments
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Stack>
          <Container sx={{ p: 1 }}>
            <Stack
              gap={2}
              sx={{ display: 'flex', alignItems: 'center', mt: 3 }}
            >
              <Typography variant="h6" color={theme.palette.grey[800]}>
                Products
              </Typography>
              <DoubleCellLayoutProducts products={products} />
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

export default SellerScreen;
