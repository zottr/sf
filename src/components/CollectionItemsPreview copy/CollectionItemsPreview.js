import React from 'react';
import HorizontalScroll from './HorizontalScroll';
import './styles.css';
import { Box, CircularProgress, useTheme } from '@mui/material';
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
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        {collections?.map((col) => (
          <HorizontalScroll key={col.id} data={col} />
        ))}
      </Box>
    </>
  );
}

export default CollectionItemsPreview;
