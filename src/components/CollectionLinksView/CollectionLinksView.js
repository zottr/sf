import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';
import CollectionLink from './CollectionLink';
import CollectionsContext from '../../context/CollectionsContext';

function CollectionLinksView() {
  const { collections, loading } = React.useContext(CollectionsContext);
  const theme = useTheme();

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
      <Box className="horizontal-scroll">
        {collections?.map((item) => (
          <CollectionLink key={item.id} item={item} />
        ))}
      </Box>
    </>
  );
}

export default CollectionLinksView;
