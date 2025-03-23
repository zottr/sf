import { Typography, Box, Button, Stack, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link as RouterLink } from 'react-router-dom';

function Item({ item }) {
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
    <Box sx={{ width: '8rem', marginLeft: '10px' }}>
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
        component={RouterLink}
        to={`/product/${item.slug}`}
      >
        <Box
          sx={{
            width: '7.5rem',
            height: '7.5rem',
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            position: 'relative',
          }}
          style={{
            backgroundImage: `url(${item.productAsset?.preview.replace(
              /\\/g,
              '/'
            )}?preset=thumb)`,
            borderRadius: '15px',
          }}
        />
      </Box>
      <Stack>
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
          {item.productName}
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
          ₹{Number(item.price?.min ?? 0) / 100}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Item;
