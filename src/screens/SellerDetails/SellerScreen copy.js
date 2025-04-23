import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS_WITH_OPTIONS } from '../../apollo/server';
import DoubleCellLayoutProducts from '../../components/ProuctsDisplay/DoubleCellLayoutProducts';
import useAdminInfo from '../../customhooks/useAdminInfo';
import CallActionButtons from '../../components/common/CallActionButtons';
import UpiPaymentDialog from '../../components/common/UpiPaymentDialog';
import Banner from '../../components/common/Banner';
import StarButton from './FavButton';
import { handleError } from '../../context/ErrorContext';

const PRODUCTS_FROM_SELLER = gql`
  ${GET_PRODUCTS_WITH_OPTIONS}
`;

function SellerScreen() {
  const query = useParams();
  const sellerId = query.sellerId;
  const [products, setProducts] = useState();
  const [adminId, setAdminId] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { adminData, loading, error } = useAdminInfo({ adminId });

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const [fetchSellerProducts] = useLazyQuery(PRODUCTS_FROM_SELLER);

  useEffect(() => {
    let adminIdFromProduct = sellerId ?? '20';
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
      {<Banner image={adminData?.banner} />}
      {adminData && (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 3,
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              maxWidth: 300,
              textAlign: 'center',
              margin: 'auto',
            }}
          >
            <Avatar
              src={adminData.logo}
              alt={`${adminData.businessName} Logo`}
              sx={{ width: 80, height: 80, marginBottom: 2 }}
            />
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              gutterBottom
            >
              {adminData.businessName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {adminData.tagline}
            </Typography>
            <StarButton sellerId={adminData.id} />
          </Box>
          <CallActionButtons
            phoneNumber={adminData?.phoneNumber}
            iconSize="large"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={toggleDialog}>
              View Payment Information
            </Button>
            <UpiPaymentDialog
              merchantName={adminData.upiName}
              upiId={adminData.upiId}
              mobileNumber={adminData.upiPhone}
              qrCodeUrl={adminData.upiScan}
              dialogOpen={dialogOpen}
              toggleDialog={toggleDialog}
            />
          </Box>
        </>
      )}
      {<DoubleCellLayoutProducts products={products} />}
    </>
  );
}

export default SellerScreen;
