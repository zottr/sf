import { Grid, Skeleton, Divider, Stack, Box, Typography } from '@mui/material';

function CollectionLinkSkeleton() {
  return (
    <Box
      sx={{
        marginX: '.3rem',
        marginBottom: '.5rem',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{
          bgcolor: 'grey.300',
          borderRadius: '50px',
          width: '4rem',
          height: '4rem',
        }}
      />
      <Typography variant="heavyb3" sx={{ width: '100%' }}>
        <Skeleton
          animation="wave"
          variant="text"
          sx={{
            bgcolor: 'grey.300',
          }}
        />
      </Typography>
    </Box>
  );
}

function CollectionLinksViewSkeleton() {
  const numberOfItems = 6;
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
          <CollectionLinkSkeleton />
          {/* {index < numberOfItems - 1 && <Divider sx={{ mt: 1.5 }} />} */}
        </Box>
      ))}
    </Stack>
  );
}

export default CollectionLinksViewSkeleton;
