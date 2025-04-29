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
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import placeholderLogo from '/logos/zottr_logo_small1_white.svg';

const SellerListingPage = () => {
  const theme = useTheme();
  const [sellers, setSellers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 10;

  const loadMoreAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`admin-user/get-list`, {
        params: {
          skip,
          take,
        },
      });
      const newSellers = response.data;
      console.log('newSellers:', newSellers);
      setSellers((prevSellers) => [...prevSellers, ...newSellers]);
      setHasMore(newSellers?.length === take);
      setSkip((prevSkip) => prevSkip + take);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    setSellers([]);
    setSkip(0);
    setHasMore(true);
    loadMoreAdmins();
  }, []);

  // Infinite scrolling function
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        loadMoreAdmins();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreAdmins, hasMore, loading]);

  return (
    <>
      <Stack gap={4} sx={{ mx: 2 }}>
        <Box sx={{ mt: 1, justifyContent: 'center', display: 'flex' }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold' }}
          >
            All Sellers
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ width: '100%' }}>
            {sellers?.map((seller, index) => (
              <>
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
              </>
            ))}
          </Grid>
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
