import React from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function XYZ({ products }) {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} md={6} sx={{ paddingBottom: '0px' }}>
            <Box
              elevation={0}
              square
              onClick={() => {}}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: theme.palette.common.white,
                borderRadius: 2,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="b1"
                    color="textSecondary"
                    sx={{ fontWeight: 700 }}
                  >
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.disabled,
                      fontSize: '0.875rem',
                    }}
                  >
                    {product.description.length > 80
                      ? `${product.description.substring(0, 80)}`
                      : product.description}
                    {product.description.length > 80 && (
                      <span style={{ color: 'black', fontSize: '15px' }}>
                        ...read more
                      </span>
                    )}
                  </Typography>
                </Box>
                <Typography variant="b2" color="textSecondary">
                  ₹{Number(product?.price?.min ?? 0) / 100}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  alignContent: 'center',
                  display: 'flex',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${product.productAsset.preview.replace(
                      /\\/g,
                      '/'
                    )})`,
                    borderRadius: 2,
                    width: '100%',
                    height: '8rem',
                    backgroundSize: 'cover',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    position: 'relative',
                  }}
                />
                <Button
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
                </Button>
              </Box>
            </Box>
            <hr style={{ borderTop: '1px dotted gray', marginTop: '1rem' }} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default XYZ;
