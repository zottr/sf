import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import AddToCartButton from '../../screens/Product/AddToCartButton';
import ReplaceItemsConfirmationDialog from '../../screens/Product/ReplaceItemsConfirmationDialog';
import placeholderLogo from '/logos/zottr_logo_small2_grey_white.svg';

function DoubleCellLayoutSellerProducts({ items, itemType = 'product' }) {
  const theme = useTheme();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={4}>
        {items?.map((product) => (
          <>
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
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = `${placeholderLogo}`; // This should exist in /public
                    }}
                    sx={{
                      aspectRatio: 1,
                      width: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      bgcolor: 'grey.50',
                    }}
                    src={`${product.featuredAsset?.preview}?preset=small`}
                    alt={product.name}
                  />
                  <Stack sx={{ display: 'flex', mt: 1 }}>
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
                    {itemType !== 'service' && (
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
                    )}
                  </Stack>
                </Link>
                {itemType !== 'service' && (
                  <Box sx={{ width: '90%', mt: 1 }}>
                    <AddToCartButton
                      productVariantId={product.variants[0]?.id}
                      adminId={product.customFields?.adminId}
                      adminName={product.customFields?.adminName}
                      buttonTextVariant="label2"
                      buttonHeight="2.1rem"
                      setSelectedProduct={setSelectedProduct}
                    />
                  </Box>
                )}
              </Stack>
            </Grid>
            {/* <ReplaceItemsConfirmationDialog
              productVariantId={product.variants[0]?.id}
              newSellerId={product.customFields?.adminId}
              newSellerName={product.customFields?.adminName}
            /> */}
          </>
        ))}
      </Grid>
      {selectedProduct && (
        <ReplaceItemsConfirmationDialog
          productVariantId={selectedProduct?.productVariantId}
          newSellerId={selectedProduct?.adminId}
          newSellerName={selectedProduct?.adminName}
        />
      )}
    </>
  );
}

export default DoubleCellLayoutSellerProducts;
