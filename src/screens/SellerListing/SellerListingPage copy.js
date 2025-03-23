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
    <Container>
      <Stack spacing={2.5}>
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold' }}
          >
            Our Sellers
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} direction="column">
            {sellers?.map((seller) => (
              <>
                <Grid
                  item
                  key={seller.id}
                  component={Link}
                  to={`/seller/${seller.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}
                >
                  <Avatar
                    src={seller.logo}
                    alt={`${seller.businessName} Logo`}
                    sx={{ width: 48, height: 48, marginRight: 2 }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ flexGrow: 1 }}
                  >
                    {seller.businessName}
                  </Typography>
                  <Typography variant="b2" color="text.secondary">
                    {seller.tagline}
                  </Typography>
                </Grid>
                <Divider flexItem variant="middle" sx={{ opacity: 0.7 }} />
              </>
            ))}
          </Grid>
        )}
        {/* {!hasMore && (
          <Typography variant="b2">No more items to load</Typography>
        )} */}
      </Stack>
    </Container>
  );
};

export default SellerListingPage;
