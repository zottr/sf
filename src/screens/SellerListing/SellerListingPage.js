import {
  Box,
  Grid,
  Avatar,
  Typography,
  Divider,
  CircularProgress,
  Container,
  useTheme,
  Stack,
} from '@mui/material';
import { useCallback, useEffect, useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import placeholderLogo from '/logos/zottr_logo_small1_white.svg';
import SellerBreadcrumbs from './SellerBreadcrumbs';

const SellerListingPage = () => {
  const loadingRef = useRef(false);
  const theme = useTheme();
  const [sellers, setSellers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 6;

  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];

  const loadMoreAdmins = async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    const currentSkip = skip;
    if (initialLoaded) setLoadingMore(true);
    try {
      const response = await axiosClient.get(`admin-user/get-list`, {
        params: {
          skip: currentSkip,
          take,
          channelToken:
            subdomain === 'demo'
              ? import.meta.env.VITE_VENDURE_DEMO_CHANNEL_TOKEN
              : import.meta.env.VITE_VENDURE_UH_CHANNEL_TOKEN,
        },
      });
      const newSellers = response.data;
      if (currentSkip === 0) {
        setSellers(newSellers);
        setInitialLoaded(true); // mark first load as complete
      } else {
        setSellers((prev) => [...prev, ...newSellers]);
      }
      setHasMore(newSellers.length === take);
      setSkip(currentSkip + take); // correctly advance skip
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      if (initialLoaded) setLoadingMore(false);
      loadingRef.current = false;
    }
  };

  // useEffect(() => {
  //   setSellers([]);
  //   setSkip(0);
  //   setHasMore(true);
  //   loadingRef.current = false;
  //   setTimeout(() => {
  //     loadMoreAdmins();
  //   }, 0);
  // }, []);

  useEffect(() => {
    loadMoreAdmins();
  }, []);

  // Infinite scrolling function
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        initialLoaded // only fetch on scroll *after* initial load is done
      ) {
        loadMoreAdmins();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreAdmins, hasMore, initialLoaded]);

  return (
    <>
      <SellerBreadcrumbs />
      <Stack gap={4} sx={{ mx: 2 }}>
        <Box sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold' }}
          >
            All Sellers
          </Typography>
        </Box>
        {!initialLoaded ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress thickness={4} size={50} />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ width: '100%' }}>
            {sellers?.map((seller, index) => (
              <Fragment key={seller.id || index}>
                <Grid
                  item
                  container
                  xs={12}
                  key={seller.id}
                  component={Link}
                  to={`/seller/${seller.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Grid item xs={3}>
                    <Avatar
                      src={seller.logo}
                      alt={`${seller.businessName} Logo`}
                      sx={{
                        width: '60px',
                        height: '60px',
                        border: '1px solid rgba(200,200,200,1)',
                        bgcolor: 'secondary.light',
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: '80%',
                          width: '80%',
                        }}
                        src={placeholderLogo}
                      />
                    </Avatar>
                  </Grid>
                  <Grid item xs={9}>
                    <Stack>
                      <Typography
                        variant="heavyb1"
                        sx={{ wordWrap: 'break-word' }}
                      >
                        {seller.businessName}
                      </Typography>
                      <Typography
                        variant="b2"
                        sx={{
                          color: theme.palette.grey[700],
                          wordWrap: 'break-word',
                        }}
                      >
                        {seller.tagline}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {index !== sellers.length - 1 && (
                    <Divider
                      flexItem
                      variant="fullWidth"
                      sx={{ opacity: 0.8 }}
                    />
                  )}
                </Grid>
              </Fragment>
            ))}
          </Grid>
        )}
        {loadingMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -2 }}>
            <CircularProgress thickness={4} />
          </Box>
        )}
      </Stack>
      {!hasMore && sellers.length !== 0 && (
        <Stack
          direction="row"
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
        >
          <Typography variant="heavyb2" color="brown">
            That's all!
          </Typography>
          <Typography variant="b1" sx={{ fontSize: '20px' }}>
            &#x1F44B;
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default SellerListingPage;
