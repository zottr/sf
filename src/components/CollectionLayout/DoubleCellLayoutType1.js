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

function DoubleCellLayoutType1({ products }) {
  const theme = useTheme();

  return (
    <Grid container columnSpacing={1} rowSpacing={2} sx={{ paddingX: '10px' }}>
      {products?.map((item, index) => (
        <Grid
          key={item.product.slug}
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to={`/product/${item.product.slug}`}
            style={{ textDecoration: 'none' }}
          >
            {/* <Box
        sx={{
          backgroundImage: `url(${product.productAsset.preview.replace(
            /\\/g,
            '/'
          )}?preset=small)`,
          width: '100%',
          height: '10rem',
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          position: 'relative',
        }}
      /> */}
            <Box>
              <Box
                component="img"
                sx={{
                  aspectRatio: 1,
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  // backgroundColor: 'hsl(81, 33%, 97%)',
                }}
                src={`${item.product.featuredAsset?.preview}?preset=medium`}
                alt={item.product.name}
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
                  {item.product.name}
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
                  {item.product?.customFields?.adminName}
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
                  ₹{Number(item.product.variants[0]?.price ?? 0) / 100}
                </Typography>
              </Stack>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default DoubleCellLayoutType1;
