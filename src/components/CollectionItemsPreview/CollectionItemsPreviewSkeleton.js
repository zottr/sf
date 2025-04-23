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

function CollectionItem() {
  const numberOfItems = 3;
  return (
    <Stack spacing={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
      <Container>
        <Stack spacing={1}>
          <Box>
            <Typography variant="h6" width="50%">
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  bgcolor: 'grey.300',
                }}
              />
            </Typography>
            <Typography variant="b2">
              <Skeleton
                animation="wave"
                variant="text"
                sx={{
                  bgcolor: 'grey.300',
                  width: '70%',
                }}
              />
            </Typography>
          </Box>
          <Divider />
        </Stack>
      </Container>
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
            {/* {index < numberOfItems - 1 && <Divider sx={{ mt: 1.5 }} />} */}
          </Box>
        ))}
      </Stack>
      <Button sx={{ width: '50%' }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{
            bgcolor: 'grey.300',
            width: '100%',
            height: '1.8rem',
            borderRadius: '25px',
          }}
        />
      </Button>
    </Stack>
  );
}

function CollectionItemsPreviewSkeleton() {
  const numberOfCollectionPreviewItems = 2;
  return (
    <Stack
      direction="column"
      gap={4}
      sx={{
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {Array.from({ length: numberOfCollectionPreviewItems }).map(
        (_, index) => (
          <Box key={index}>
            <CollectionItem />
            {/* {index < numberOfItems - 1 && <Divider sx={{ mt: 1.5 }} />} */}
          </Box>
        )
      )}
    </Stack>
  );
}

export default CollectionItemsPreviewSkeleton;
