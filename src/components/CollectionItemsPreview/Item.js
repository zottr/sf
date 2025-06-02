import {
  Typography,
  Box,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link as RouterLink } from 'react-router-dom';
import placeholderLogo from '/logos/zottr_logo_small2_grey_white.svg';

function Item({ item, collectionSlug }) {
  const theme = useTheme();

  return (
    <Box sx={{ width: { xs: '8rem' }, marginLeft: '10px' }}>
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
        component={RouterLink}
        to={
          item.customFields.itemType === 'service'
            ? `/service/${item.slug}`
            : `/product/${item.slug}`
        }
      >
        <Box
          component="img"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = `${placeholderLogo}`; // This should exist in /public
          }}
          sx={{
            width: { xs: '7.5rem' },
            height: { xs: '7.5rem' },
            objectFit: 'contain',
            objectPosition: 'center',
            borderRadius: '10px',
          }}
          src={`${item.featuredAsset?.preview}?preset=small`}
          alt={item.name}
        />
      </Box>
      <Stack>
        <Typography
          variant="heavyb2"
          sx={{
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
          {item.name}
        </Typography>
        <Typography
          variant="b3"
          sx={{
            color: theme.palette.grey[700],
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
          {item?.customFields?.adminName}
        </Typography>
        {collectionSlug !== 'services' && (
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
            ₹{Number(item.variants[0].price ?? 0) / 100}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default Item;
