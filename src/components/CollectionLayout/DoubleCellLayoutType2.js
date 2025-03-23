import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function DoubleCellLayoutType2({ products }) {
  const theme = useTheme();
  return (
    <Grid container>
      {products.map((product, index) => (
        <Grid key={index} item xs={6} sx={{}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '3px',
              backgroundColor: theme.palette.common.white,
            }}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              <Link
                to={`/${product.sellerSlug}/${product.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${product.productAsset.preview.replace(
                      /\\/g,
                      '/'
                    )})`,
                    width: '100%',
                    height: '12rem',
                    backgroundSize: 'cover',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    style={{
                      width: '100%',
                      height: 'auto',
                      position: 'absolute',
                      bottom: 0,
                      backgroundColor: theme.palette.common.darkBlack,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 500,
                        marginLeft: '5px',
                        marginTop: '5px',
                      }}
                      align="left"
                    >
                      {product.productName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'white',
                        fontWeight: 500,
                        marginLeft: '5px',
                      }}
                      align="left"
                    >
                      by {product.sellerName}
                    </Typography>

                    <Stack direction={'row'}>
                      <LocalOfferIcon
                        fontSize="small"
                        sx={{ color: 'yellowgreen' }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: 'white',
                          fontWeight: 500,
                          marginLeft: '5px',
                        }}
                        align="left"
                      >
                        <strong>₹{Number(product.price.min ?? 0) / 100}</strong>
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Link>

              {/* <Button
                variant="contained"
                endIcon={<AddIcon sx={{ color: 'red' }} fontSize="small" />}
                sx={{
                  backgroundColor: 'white',
                  padding: '5px',
                  borderRadius: '5',
                  position: 'absolute',
                  bottom: -10,
                  right: 18,
                }}
              >
                <Typography
                  color="red"
                  variant="button"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    padding: '0px 10px 0px 10px',
                  }}
                >
                  ADD
                </Typography>
              </Button> */}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
    // <ImageList cols={2} gap={5} rowHeight={200}>
    //   {products.map((product) => (
    //     <Link
    //       to={`/${product.sellerSlug}/${product.slug}`}
    //       style={{ textDecoration: 'none', margin: 0 }}
    //     >
    //       <ImageListItem key={product.productAsset.preview} rows={1}>
    //         <img
    //           srcSet={product.productAsset.preview.replace(/\\/g, '/')}
    //           src={product.productAsset.preview.replace(/\\/g, '/')}
    //           alt={product.productName}
    //           loading="lazy"
    //         />
    //         <ImageListItemBar
    //           title={product.productName}
    //           subtitle={`by @${product.sellerName}`}
    //           actionIcon={
    //             <IconButton
    //               sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
    //               aria-label={`info about ${product.productName}`}
    //             >
    //               <InfoIcon />
    //             </IconButton>
    //           }
    //         />
    //       </ImageListItem>
    //     </Link>
    //   ))}
    // </ImageList>
  );
}

export default DoubleCellLayoutType2;
