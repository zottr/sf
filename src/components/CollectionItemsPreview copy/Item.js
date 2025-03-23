import { Typography, Box, Button, Stack, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link as RouterLink } from 'react-router-dom';

function Item({ item }) {
  const theme = useTheme();

  return (
    <Box sx={{ marginX: '10px' }}>
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          borderRadius: '10px',
        }}
        component={RouterLink}
        to={`/product/${item.slug}`}
      >
        <Box
          sx={{
            width: '7rem',
            height: '7rem',
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
            position: 'relative',
          }}
          style={{
            backgroundImage: `url(${item.featuredAsset?.preview.replace(
              /\\/g,
              '/'
            )})`,
            borderRadius: '10px',
          }}
        >
          <Button
            sx={{
              padding: '1px',
              borderRadius: 'inherit',
              minWidth: 'auto',
              position: 'absolute',
              right: 0,
              bottom: 0,
              '&:hover': {},
            }}
          >
            <AddBoxIcon
              fontSize="medium"
              style={{ color: 'green', backgroundColor: 'transparent' }}
            />
          </Button>
        </Box>
      </Box>
      <Stack>
        <Typography variant="caption" style={{ textAlign: 'center' }}>
          {item.name}
        </Typography>
        <Typography
          variant="caption"
          style={{
            color: theme.palette.secondary.contrastText,
            textAlign: 'center',
          }}
        >
          <span>&#8377;</span>
          {Math.min(
            ...item.variants.map((variant) => Number(variant.price ?? 0) / 100)
          )}
        </Typography>
      </Stack>
    </Box>
  );
}

export default Item;
