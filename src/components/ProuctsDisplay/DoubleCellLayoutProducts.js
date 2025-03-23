import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddToCartButton from '../../screens/Product/AddToCartButton';
import ReplaceItemsConfirmationDialog from '../../screens/Product/ReplaceItemsConfirmationDialog';

function DoubleCellLayoutProducts({ products }) {
  const theme = useTheme();
  function getRandomSeller() {
    let sellers = [
      'Taco & Bell',
      'Choco Kreations',
      'Dominos',
      'McDolands',
      'Naturals',
    ];
    const randomIndex = Math.floor(Math.random() * sellers.length); // Generate a random index
    return sellers[randomIndex]; // Return the seller at that index
  }
  return (
    <Grid container columnSpacing={1} rowSpacing={2}>
      {products?.map((product, index) => (
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
                  sx={{
                    aspectRatio: 1,
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    // backgroundColor: 'hsl(81, 33%, 97%)',
                  }}
                  src={`${product.featuredAsset?.preview}`}
                  alt={product.name}
                />
                <Stack sx={{ display: 'flex' }}>
                  <Typography
                    variant="heavyb2"
                    sx={{
                      // textAlign: 'center',
                      color: theme.palette.grey[900],
                      //avoid word spilling
                      wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                      whiteSpace: 'normal', // Allows the text to wrap within the container
                      width: '100%', // Ensure the text takes up the full width of its container
                      //line truncate after 3 lines
                      display: 'block',
                      maxHeight:
                        '4.29em' /* Adjust based on your line-height: 3 * (line-height of heavyb2 typography variant) */,
                      overflow: 'hidden',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="b3"
                    sx={{
                      color: theme.palette.grey[700],
                      // textAlign: 'center',
                      //avoid word spilling
                      wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                      whiteSpace: 'normal', // Allows the text to wrap within the container
                      width: '100%', // Ensure the text takes up the full width of its container
                      //line truncate after 3 lines
                      display: 'block',
                      maxHeight:
                        '4.29em' /* Adjust based on your line-height: 3 * (line-height of b3 typography variant) */,
                      overflow: 'hidden',
                    }}
                  >
                    {getRandomSeller()}
                  </Typography>
                  <Typography
                    variant="heavyb2"
                    sx={{
                      color: 'hsl(39,100%,40%)',
                      // textAlign: 'center',
                      //avoid word spilling
                      wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                      whiteSpace: 'normal', // Allows the text to wrap within the container
                      width: '100%', // Ensure the text takes up the full width of its container
                      //price shouldn't extend more than 1 line
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
                />
              </Box>
            </Stack>
          </Grid>
          <ReplaceItemsConfirmationDialog
            productVariantId={product.variants[0]?.id}
            adminId={product.customFields?.adminId}
          />
        </>
      ))}
    </Grid>
  );
}

export default DoubleCellLayoutProducts;
