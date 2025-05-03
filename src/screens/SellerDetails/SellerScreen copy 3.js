import { useCallback, useEffect, useState } from 'react';
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
import noItemsFoundImage from '/images/no_items_found.svg';

function SellerScreen() {
  const navigate = useNavigate();
  const theme = useTheme();
  const query = useParams();
  const sellerId = query.sellerId;
  const [products, setProducts] = useState([]);
  const [adminId, setAdminId] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { adminData, loading: adminLoading, error } = useAdminInfo({ adminId });
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const [fetchProducts, { loading: initialLoading }] = useLazyQuery(
    PRODUCTS_FROM_SELLER,
    {
      onCompleted: (data) => {
        const newProducts = data?.products?.items || [];
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        console.log('newProducts:', newProducts);
        setInitialLoadCompleted(true);
        setHasMore(newProducts.length === take); // Stop loading if fewer products than `take` are returned
        setIsLoadingMore(false);
      },
      onError: (err) => handleError(err),
    }
  );

  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || !hasMore || initialLoading) return;
    setIsLoadingMore(true);
    setSkip((prevSkip) => {
      const newSkip = prevSkip + take;
      fetchProducts({
        variables: {
          options: {
            filter: { adminId: { eq: sellerId } },
            skip: newSkip,
            take,
            sort: { updatedAt: 'DESC' },
          },
        },
      });
      return newSkip;
    });
  }, [fetchProducts, hasMore, isLoadingMore, skip, take]);

  useEffect(() => {
    console.log('adminData:', adminData);
  });

  useEffect(() => {
    setAdminId(sellerId);
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setIsLoadingMore(false);
    // Fetch products for the new `slug`
    // Wait for state to reset before fetching products
    setTimeout(() => {
      fetchProducts({
        variables: {
          options: {
            filter: { adminId: { eq: sellerId } },
            skip: 0,
            take,
            sort: { updatedAt: 'DESC' },
          },
        },
      });
    }, 0);
  }, [sellerId]);

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMore &&
        !isLoadingMore
      ) {
        loadMoreProducts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, hasMore, isLoadingMore]);

  if (error) {
    return <>{handleError(error)}</>;
  }

  return adminLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      {adminData && (
        <>
          <SellerInfo adminData={adminData} />
          <Container sx={{ p: 1 }}>
            {adminData?.banner != null && adminData?.banner !== '' && (
              <Box
                component="img"
                sx={{
                  height: '200px',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  mt: 2,
                  borderRadius: '10px',
                }}
                src={adminData?.banner}
              />
            )}
            <Stack
              gap={3}
              sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}
            >
              <Typography variant="h5" color={theme.palette.grey[700]}>
                Products
              </Typography>
              {products.length !== 0 && (
                <DoubleCellLayoutSellerProducts products={products} />
              )}
              {products.length === 0 && initialLoadCompleted && (
                <Stack
                  gap={1}
                  sx={{ display: 'flex', alignItems: 'center', mt: 5 }}
                >
                  <Typography
                    variant="h7"
                    sx={{ color: 'grey.500', textAlign: 'center' }}
                  >
                    {adminData.businessName} doesn't have any product listings.
                  </Typography>
                  <Box
                    component="img"
                    sx={{
                      width: '60%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      borderRadius: '10px',
                    }}
                    src={noItemsFoundImage}
                  />
                </Stack>
              )}
              {/* Loading more spinner */}
              {isLoadingMore && products.length !== 0 && (
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}
                >
                  <CircularProgress />
                </Box>
              )}
              {/* No more products message */}
              {!hasMore && products.length !== 0 && (
                <Stack
                  direction="row"
                  sx={{
                    mt: 4,
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="heavyb1" color="brown">
                    That's all!
                  </Typography>
                  <Typography variant="b1" sx={{ fontSize: '20px' }}>
                    &#x1F44B;
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

export default SellerScreen;
