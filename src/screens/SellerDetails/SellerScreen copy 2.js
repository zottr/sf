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
import DoubleCellLayoutSellerProducts from '../../components/SellerProducts/DoubleCellLayoutSellerProducts';
import useAdminInfo from '../../customhooks/useAdminInfo';
import CallActionButtons from '../../components/shared/CallActionButtons';
import FavButton from './FavButton';
import { handleError } from '../../context/ErrorContext';
import { initiateAudioCall, openWhatsAppChat } from '../../utils/CommonUtils';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';
import { useNavigate } from 'react-router-dom';
import SellerInfo from './SellerInfo';
import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';
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

  console.log('adminData:', adminData);

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
          </Stack>
          <SellerInfo adminData={adminData} />
          <Container sx={{ p: 1 }}>
            <Stack
              gap={2}
              sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}
            >
              <Typography variant="h6" color={theme.palette.grey[700]}>
                Products
              </Typography>
              <DoubleCellLayoutSellerProducts products={products} />
              {/* <DoubleCellLayoutType1 products={products} /> */}
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

export default SellerScreen;
