import {
  Box,
  Grid,
  Avatar,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useFavorites } from '../../context/FavoriteSellerContext';

const FavoriteSellerListing = () => {
  const { favoriteSellers } = useFavorites();
  const [sellerDetails, setSellerDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch seller details via REST API when favoriteSellers list updates
  useEffect(() => {
    const fetchSellerDetails = async () => {
      setLoading(true);
      const details = {};

      for (const sellerId of favoriteSellers) {
        try {
          const response = await axiosClient.get(
            `admin-user/get-info/${sellerId}`
          );
          details[sellerId] = response.data;
        } catch (error) {
          console.error(
            `Failed to fetch details for seller ${sellerId}:`,
            error
          );
        }
      }

      setSellerDetails(details);
      setLoading(false);
    };

    fetchSellerDetails();
  }, [favoriteSellers]);

  return (
    <Box sx={{ paddingLeft: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Favourite Sellers
      </Typography>
      {loading && <CircularProgress />}
      <Grid container spacing={2} direction="column">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          Object.keys(sellerDetails).map((sellerId) => {
            const seller = sellerDetails[sellerId];
            return (
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
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default FavoriteSellerListing;
