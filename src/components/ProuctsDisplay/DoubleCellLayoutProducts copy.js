import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReplaceItemsConfirmationDialog from '../../screens/Product/ReplaceItemsConfirmationDialog';
import AddToCartButton from '../../screens/Product/AddToCartButton';

function DoubleCellLayoutProducts({ products }) {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        {products?.map((product, index) => (
          <>
            <Grid key={index} item xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '2px',
                  backgroundColor: theme.palette.common.white,
                  position: 'relative',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Link
                    to={`/${product.sellerSlug}/${product.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      sx={{
                        backgroundImage: `url(${product.featuredAsset?.preview?.replace(
                          /\\/g,
                          '/'
                        )})`,
                        width: '100%',
                        height: '10rem',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box
                      sx={{
                        width: '100%',
                        backgroundColor: theme.palette.common.white,
                        padding: '8px',
                      }}
                    >
                      <Typography
                        variant="b1"
                        color={theme.palette.common.black}
                        sx={{ fontWeight: theme.typography.fontWeightMedium }}
                        align="left"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={theme.palette.grey[700]}
                        sx={{ fontWeight: theme.typography.fontWeightMedium }}
                        align="left"
                      >
                        {product.customFields?.adminName}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocalOfferIcon
                          fontSize="small"
                          sx={{ color: 'yellowgreen' }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.common.black,
                            fontWeight: theme.typography.fontWeightMedium,
                          }}
                          align="left"
                        >
                          <strong>
                            ₹{Number(product.variants[0]?.price ?? 0) / 100}
                          </strong>
                        </Typography>
                      </Stack>
                    </Box>
                  </Link>
                </Box>
              </Box>
              <AddToCartButton
                productVariantId={product.variants[0]?.id}
                adminId={product.customFields?.adminId}
                buttonTextVariant="label2"
                buttonHeight="2.1rem"
              />
            </Grid>
            <ReplaceItemsConfirmationDialog
              productVariantId={product.variants[0]?.id}
              adminId={product.customFields?.adminId}
            />
          </>
        ))}
      </Grid>
    </>
  );
}

export default DoubleCellLayoutProducts;
