import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import CollectionItemsPreview from '../../components/CollectionItemsPreview';
import CollectionLinksView from '../../components/CollectionLinksView';
import StoreBanner from '../../components/StoreBanner';

function Home() {
  return (
    // <Stack sx={{ maxWidth: '900px', display: 'flex', alignItems: 'center' }}>
    <Stack
      sx={{
        overflowX: 'clip',
        maxWidth: '100vw',
      }}
    >
      <CollectionLinksView />
      <StoreBanner />
      {/* <Stack sx={CollectionItemsPreviewStyles}> */}
      <Stack sx={{ width: '100%', mt: 2 }}>
        <CollectionItemsPreview />
      </Stack>
    </Stack>
  );
}
export default Home;
