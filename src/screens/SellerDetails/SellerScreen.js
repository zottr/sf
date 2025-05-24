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
  const navigate = useNavigate();
  const theme = useTheme();
  const query = useParams();
  const sellerId = query.sellerId;
  const [adminId, setAdminId] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { adminData, loading: adminLoading, error } = useAdminInfo({ adminId });
  const [tabIndex, setTabIndex] = useState(0);
  const take = 10;

  //products states
  const loadingRefProducts = useRef(false);
  const lastRequestedSkipRefProducts = useRef(0);
  const [products, setProducts] = useState([]);
  const [initialLoadCompletedProducts, setInitialLoadCompletedProducts] =
    useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [skipProducts, setSkipProducts] = useState(0);
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);

  //services states
  const loadingRefServices = useRef(false);
  const lastRequestedSkipRefServices = useRef(0);
  const [services, setServices] = useState([]);
  const [initialLoadCompletedServices, setInitialLoadCompletedServices] =
    useState(false);
  const [hasMoreServices, setHasMoreServices] = useState(true);
  const [skipServices, setSkipServices] = useState(0);
  const [isLoadingMoreServices, setIsLoadingMoreServices] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const [fetchProducts, { loading: initialLoadingProducts }] = useLazyQuery(
    PRODUCTS_FROM_SELLER,
    {
      onCompleted: (data) => {
        const newItems = data?.products?.items || [];

        // If skip is 0, this is an initial load — replace
        if (lastRequestedSkipRefProducts.current === 0) {
          setProducts(newItems);
        } else {
          // Otherwise, append
          setProducts((prev) => [...prev, ...newItems]);
        }
        setInitialLoadCompletedProducts(true);
        setHasMoreProducts(newItems.length === take);
        setIsLoadingMoreProducts(false);
        loadingRefProducts.current = false;
      },
      onError: (err) => {
        handleError(err);
        setIsLoadingMoreProducts(false);
        loadingRefProducts.current = false;
      },
    }
  );

  const [fetchServices, { loading: initialLoadingServices }] = useLazyQuery(
    PRODUCTS_FROM_SELLER,
    {
      onCompleted: (data) => {
        const newItems = data?.products?.items || [];

        // If skip is 0, this is an initial load — replace
        if (lastRequestedSkipRefServices.current === 0) {
          setServices(newItems);
        } else {
          // Otherwise, append
          setServices((prev) => [...prev, ...newItems]);
        }
        setInitialLoadCompletedServices(true);
        setHasMoreServices(newItems.length === take);
        setIsLoadingMoreServices(false);
        loadingRefServices.current = false;
      },
      onError: (err) => {
        handleError(err);
        setIsLoadingMoreServices(false);
        loadingRefServices.current = false;
      },
    }
  );

  const loadMoreProducts = useCallback(() => {
    if (
      loadingRefProducts.current ||
      !hasMoreProducts ||
      initialLoadingProducts ||
      !initialLoadCompletedProducts
    )
      return;

    const newSkip = skipProducts + take;
    loadingRefProducts.current = true;
    lastRequestedSkipRefProducts.current = newSkip;

    fetchProducts({
      variables: {
        options: {
          filter: {
            adminId: { eq: sellerId },
            itemType: { notEq: 'service' },
          },
          skip: newSkip,
          take,
          sort: { updatedAt: 'DESC' },
        },
      },
    });
    setSkipProducts(newSkip);
  }, [
    fetchProducts,
    hasMoreProducts,
    isLoadingMoreProducts,
    skipProducts,
    take,
  ]);

  const loadMoreServices = useCallback(() => {
    if (
      loadingRefServices.current ||
      !hasMoreServices ||
      initialLoadingServices ||
      !initialLoadCompletedServices
    )
      return;
    const newSkip = skipServices + take;
    loadingRefServices.current = true;
    lastRequestedSkipRefServices.current = newSkip;

    fetchServices({
      variables: {
        options: {
          filter: {
            adminId: { eq: sellerId },
            itemType: { eq: 'service' },
          },
          skip: newSkip,
          take,
          sort: { updatedAt: 'DESC' },
        },
      },
    });
    setSkipServices(newSkip);
  }, [
    fetchServices,
    hasMoreServices,
    isLoadingMoreServices,
    skipServices,
    take,
  ]);

  useEffect(() => {
    if (tabIndex === 0) {
      setAdminId(sellerId);
      setProducts([]);
      setInitialLoadCompletedProducts(false);
      setSkipProducts(0);
      setHasMoreProducts(true);
      setIsLoadingMoreProducts(false);
      loadingRefProducts.current = false;
      lastRequestedSkipRefProducts.current = 0;
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
    } else {
      setAdminId(sellerId);
      setServices([]);
      setInitialLoadCompletedServices(false);
      setSkipServices(0);
      setHasMoreServices(true);
      setIsLoadingMoreServices(false);
      loadingRefServices.current = false;
      lastRequestedSkipRefServices.current = 0;
      setTimeout(() => {
        fetchServices({
          variables: {
            options: {
              filter: {
                adminId: { eq: sellerId },
                itemType: { eq: 'service' },
              },
              skip: 0,
              take,
              sort: { updatedAt: 'DESC' },
            },
          },
        });
      }, 0);
    }
  }, [sellerId, tabIndex]);

  useEffect(() => {
    const handleScrollProducts = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMoreProducts
      ) {
        loadMoreProducts();
      }
    };
    window.addEventListener('scroll', handleScrollProducts);
    return () => window.removeEventListener('scroll', handleScrollProducts);
  }, [loadMoreProducts, hasMoreProducts, isLoadingMoreProducts]);

  useEffect(() => {
    const handleScrollServices = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMoreServices
      ) {
        loadMoreServices();
      }
    };
    window.addEventListener('scroll', handleScrollServices);
    return () => window.removeEventListener('scroll', handleScrollServices);
  }, [loadMoreServices, hasMoreServices, isLoadingMoreServices]);

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
                <>
                  {!initialLoadCompletedProducts && (
                    <Box
                      sx={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <CircularProgress
                        thickness={4}
                        size={45}
                        sx={{ top: '50px', position: 'absolute' }}
                      />
                    </Box>
                  )}
                  {initialLoadCompletedProducts && (
                    <Stack
                      gap={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      {products.length !== 0 && (
                        <DoubleCellLayoutSellerProducts items={products} />
                      )}
                      {products.length === 0 &&
                        initialLoadCompletedProducts && (
                          <Stack
                            gap={1}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mt: 5,
                            }}
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
                      {isLoadingMoreProducts && products.length !== 0 && (
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
                      {!hasMoreProducts && products.length !== 0 && (
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
                </>
              )}
              {/* Services Tab */}
              {tabIndex === 1 && (
                <>
                  {!initialLoadCompletedServices && (
                    <Box
                      sx={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <CircularProgress
                        thickness={4}
                        size={45}
                        sx={{ top: '50px', position: 'absolute' }}
                      />
                    </Box>
                  )}
                  {initialLoadCompletedServices && (
                    <Stack
                      gap={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      {services.length !== 0 && (
                        <DoubleCellLayoutSellerProducts
                          items={services}
                          itemType="service"
                        />
                      )}
                      {services.length === 0 &&
                        initialLoadCompletedServices && (
                          <Stack
                            gap={1}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mt: 5,
                            }}
                          >
                            <Typography
                              variant="h7"
                              sx={{ color: 'grey.500', textAlign: 'center' }}
                            >
                              {adminData.businessName} doesn't have any service
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
                      {isLoadingMoreServices && services.length !== 0 && (
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
                      {!hasMoreServices && services.length !== 0 && (
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
                </>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}

export default SellerScreen;
