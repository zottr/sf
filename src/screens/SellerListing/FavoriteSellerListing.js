import {
  Box,
  Grid,
  Avatar,
  Typography,
  Divider,
  CircularProgress,
  Stack,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useFavorites } from '../../context/FavoriteSellerContext';
import placeholderLogo from '/logos/zottr_logo_small1_white.svg';
import { isLocalStorageAvailable } from '../../utils/CommonUtils';
import ErrorAlert from '../../components/shared/Alerts/ErrorAlert';
import noItemsFoundImage from '/images/no_items_found.svg';
import SellerBreadcrumbs from './SellerBreadcrumbs';

const FavoriteSellerListing = () => {
  const theme = useTheme();
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

  const sellerNumbers = Object.keys(sellerDetails).length;

  return (
    <>
      <SellerBreadcrumbs type="favorite" />
      <Stack gap={4} sx={{ mx: 2 }}>
        <Box sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.grey[800], fontWeight: 'bold' }}
          >
            Favorite Sellers
          </Typography>
        </Box>
        {!isLocalStorageAvailable() ? (
          <Box sx={{}}>
            <ErrorAlert
              title="Your web browser's local storage is disabled"
              description="We store your Favorite Sellers list in web browser's storage. Please enable browser storage to use this feature."
              variant="standard"
            />
          </Box>
        ) : (
          <>
            {loading ? (
              <Box
                sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {sellerNumbers === 0 ? (
                  <Stack
                    gap={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: 'grey.500', textAlign: 'center' }}
                    >
                      You don't have any favorite sellers yet!
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
                ) : (
                  <Grid container spacing={2} sx={{ width: '100%' }}>
                    {Object.keys(sellerDetails).map((sellerId, index) => {
                      const seller = sellerDetails[sellerId];
                      return (
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
                            {index !== sellerNumbers - 1 && (
                              <Divider
                                flexItem
                                variant="fullWidth"
                                sx={{ opacity: 0.8 }}
                              />
                            )}
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default FavoriteSellerListing;
