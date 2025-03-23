import React from 'react';
import HorizontalScroll from './HorizontalScroll';
import './styles.css';
import { Box, CircularProgress, Stack, useTheme } from '@mui/material';
import CollectionsContext from '../../context/CollectionsContext';

function CollectionItemsPreview() {
  const theme = useTheme();
  const { collections, loading } = React.useContext(CollectionsContext);
  return (
    <>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      {/* <Box sx={{ backgroundColor: theme.palette.background.default }}> */}
      <Stack spacing={4}>
        {collections?.map((collection) => (
          <HorizontalScroll
            key={collection.slug ?? collection.id}
            collection={collection}
          />
        ))}
      </Stack>

      {/* </Box> */}
    </>
  );
}

export default CollectionItemsPreview;
