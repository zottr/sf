import {
  Grid,
  Skeleton,
  Divider,
  Stack,
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';

function Item() {
  return (
    <Box sx={{ width: '8rem', marginLeft: '10px' }}>
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            bgcolor: 'grey.300',
            width: '7.5rem',
            height: '7.5rem',
            borderRadius: '15px',
          }}
        />
      </Box>
      <Stack>
        <Typography variant="heavyb2">
          <Skeleton
            animation="wave"
            variant="text"
            sx={{
              bgcolor: 'grey.300',
            }}
          />
        </Typography>
        <Typography variant="b3">
          <Skeleton
            animation="wave"
            variant="text"
            sx={{
              bgcolor: 'grey.300',
            }}
          />
        </Typography>
        <Typography variant="heavyb2">
          <Skeleton
            animation="wave"
            variant="text"
            sx={{
              bgcolor: 'grey.300',
              width: '50%',
            }}
          />
        </Typography>
      </Stack>
    </Box>
  );
}

function ItemsSkeleton() {
  const numberOfItems = 3;
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <Box key={index}>
          <Item />
        </Box>
      ))}
    </Stack>
  );
}

export default ItemsSkeleton;
