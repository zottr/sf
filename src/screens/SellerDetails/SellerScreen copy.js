import { useCallback, useEffect, useState, useRef } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS_WITH_OPTIONS } from '../../apollo/server';
import DoubleCellLayoutSellerProducts from '../../components/SellerProducts/DoubleCellLayoutSellerProducts';
import useAdminInfo from '../../customhooks/useAdminInfo';
import CallActionButtons from '../../components/shared/CallActionButtons';
import FavButton from './FavButton';
import { handleError } from '../../context/ErrorContext';
import { initiateAudioCall, openWhatsAppChat } from '../../utils/CommonUtils';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SellerInfo from './SellerInfo';
import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';
import noItemsFoundImage from '/images/no_items_found.svg';

const PRODUCTS_FROM_SELLER = gql`
  ${GET_PRODUCTS_WITH_OPTIONS}
`;

function SellerScreen() {
  const loadingRef = useRef(false);
  const lastRequestedSkipRef = useRef(0);
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
  const [tabIndex, setTabIndex] = useState(0);
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const [fetchProducts, { loading: initialLoading }] = useLazyQuery(
    PRODUCTS_FROM_SELLER,
    {
      onCompleted: (data) => {
        const newProducts = data?.products?.items || [];
        console.log('newProducts:', newProducts);
        // If skip is 0, this is an initial load — replace
        if (lastRequestedSkipRef.current === 0) {
          setProducts(newProducts);
        } else {
          // Otherwise, append
          setProducts((prev) => [...prev, ...newProducts]);
        }
        setInitialLoadCompleted(true);
        setHasMore(newProducts.length === take);
        setIsLoadingMore(false);
        loadingRef.current = false;
      },
      onError: (err) => {
        handleError(err);
        setIsLoadingMore(false);
        loadingRef.current = false;
      },
    }
  );

  const loadMoreProducts = useCallback(() => {
    if (loadingRef.current || !hasMore || initialLoading) return;

    const newSkip = skip + take;
    loadingRef.current = true;
    lastRequestedSkipRef.current = newSkip;

    fetchProducts({
      variables: {
        options: {
          filter: {
            adminId: { eq: sellerId },
            // itemType: { eq: 'service' },
          },
          skip: newSkip,
          take,
          sort: { updatedAt: 'DESC' },
        },
      },
    });

    setSkip(newSkip);
  }, [fetchProducts, hasMore, isLoadingMore, skip, take]);

  useEffect(() => {
    setAdminId(sellerId);
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setIsLoadingMore(false);
    loadingRef.current = false;
    lastRequestedSkipRef.current = 0;
    setTimeout(() => {
      fetchProducts({
        variables: {
          options: {
            filter: {
              adminId: { eq: sellerId },
              itemType: { notEq: 'service' },
            },
            skip: 0,
            take,
            sort: { updatedAt: 'DESC' },
          },
        },
      });
    }, 0);
  }, [sellerId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMore
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
            {adminData?.banner && (
              <Box
                component="img"
                sx={{
                  // height: '220px',
                  width: '100%',
                  aspectRatio: 16 / 9,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  mt: 1,
                }}
                src={adminData?.banner}
              />
            )}
            {/* Tabs start here */}
            <Box sx={{ width: '100%', mt: 1 }}>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                centered
                fullWidth
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab
                  label=<Typography
                    variant={tabIndex === 0 ? 'h6' : 'h7'}
                    color={
                      tabIndex === 0
                        ? theme.palette.grey[700]
                        : theme.palette.grey[500]
                    }
                    sx={{ width: '100%', mx: 2 }}
                  >
                    Products
                  </Typography>
                />
                <Tab
                  label=<Typography
                    variant={tabIndex === 1 ? 'h6' : 'h7'}
                    color={
                      tabIndex === 1
                        ? theme.palette.grey[700]
                        : theme.palette.grey[500]
                    }
                    sx={{ width: '100%', mx: 2 }}
                  >
                    Services
                  </Typography>
                />
              </Tabs>
              {/* Products Tab */}
              {tabIndex === 0 && (
                <Stack
                  gap={3}
                  sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}
                >
                  {/* <Typography variant="h5" color={theme.palette.grey[700]}>
                    Products
                  </Typography> */}
                  {products.length !== 0 && (
                    <DoubleCellLayoutSellerProducts items={products} />
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
                        {adminData.businessName} doesn't have any product
                        listings.
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
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 2,
                      }}
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
              )}

              {/* Services Tab */}
              {tabIndex === 1 && (
                <Stack
                  sx={{
                    mt: 4,
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No services listed yet.
                  </Typography>
                </Stack>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default SellerScreen;
