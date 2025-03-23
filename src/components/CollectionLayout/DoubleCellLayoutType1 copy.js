import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function DoubleCellLayoutType1({ products }) {
  const theme = useTheme();
  return (
    <Grid container>
      {products?.map((product, index) => (
        <Grid key={product.slug} item xs={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px',
              backgroundColor: theme.palette.common.white,
            }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Link
                to={`/product/${product.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${product.productAsset.preview.replace(
                      /\\/g,
                      '/'
                    )})`,
                    width: '100%',
                    height: '10rem',
                    backgroundSize: 'cover',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    position: 'relative',
                  }}
                />
                <Box
                  style={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: theme.palette.common.white,
                  }}
                >
                  <Typography
                    variant="b1"
                    color={theme.palette.common.black}
                    sx={{
                      fontWeight: theme.typography.fontWeightMedium,
                      marginLeft: '5px',
                      marginTop: '5px',
                    }}
                    align="left"
                  >
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={theme.palette.grey[700]}
                    sx={{
                      marginLeft: '5px',
                    }}
                    align="left"
                  >
                    {product?.sellerName ?? 'Sample Seller'}
                  </Typography>
                  <Stack direction={'row'}>
                    <LocalOfferIcon
                      fontSize="small"
                      sx={{ color: 'yellowgreen' }}
                    />
                    <Typography
                      variant="b1"
                      sx={{
                        color: theme.palette.common.black,
                        marginLeft: '5px',
                      }}
                      align="left"
                    >
                      <strong>₹{Number(product?.price?.min ?? 0) / 100}</strong>
                    </Typography>
                  </Stack>
                </Box>
              </Link>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default DoubleCellLayoutType1;
