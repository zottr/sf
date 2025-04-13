import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import AddToCartButton from '../../screens/Product/AddToCartButton';
import ReplaceItemsConfirmationDialog from '../../screens/Product/ReplaceItemsConfirmationDialog';

function DoubleCellLayoutProducts({ products }) {
  const theme = useTheme();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Grid container columnSpacing={1} rowSpacing={2}>
        {products?.map((product) => (
          <Grid
            key={product.slug}
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Stack
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link
                to={`/product/${product.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  component="img"
                  sx={{
                    aspectRatio: 1,
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  src={`${product.featuredAsset?.preview}`}
                  alt={product.name}
                />
                <Stack sx={{ display: 'flex' }}>
                  <Typography
                    variant="heavyb2"
                    sx={{
                      color: theme.palette.grey[900],
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                      width: '100%',
                      display: 'block',
                      maxHeight: '4.29em',
                      overflow: 'hidden',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="b3"
                    sx={{
                      color: theme.palette.grey[700],
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                      width: '100%',
                      display: 'block',
                      maxHeight: '4.29em',
                      overflow: 'hidden',
                    }}
                  >
                    {product.customFields?.adminName}
                  </Typography>
                  <Typography
                    variant="heavyb2"
                    sx={{
                      color: 'hsl(39,100%,40%)',
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                      width: '100%',
                      display: 'block',
                      maxHeight: '1.43em',
                      overflow: 'hidden',
                    }}
                  >
                    ₹{Number(product.variants[0]?.price ?? 0) / 100}
                  </Typography>
                </Stack>
              </Link>
              <Box sx={{ width: '90%', mt: 0.5 }}>
                <AddToCartButton
                  productVariantId={product.variants[0]?.id}
                  adminId={product.customFields?.adminId}
                  buttonTextVariant="label2"
                  buttonHeight="2.1rem"
                  onClick={() =>
                    setSelectedProduct({
                      productVariantId: product.variants[0]?.id,
                      adminId: product.customFields?.adminId,
                    })
                  }
                />
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>

      {selectedProduct && (
        <ReplaceItemsConfirmationDialog
          productVariantId={selectedProduct.productVariantId}
          adminId={selectedProduct.adminId}
        />
      )}
    </>
  );
}

export default DoubleCellLayoutProducts;
