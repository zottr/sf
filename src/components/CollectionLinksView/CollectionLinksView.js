import React from 'react';
import { Box, CircularProgress, Skeleton, useTheme } from '@mui/material';
import CollectionLink from './CollectionLink';
import CollectionsContext from '../../context/CollectionsContext';
import CollectionLinksViewSkeleton from './CollectionLinksViewSkeleton';

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
          }}
        >
          <CollectionLinksViewSkeleton />
        </Box>
      )}
      {!loading && (
        <Box className="horizontal-scroll">
          {collections?.map((item) => (
            <CollectionLink key={item.id} item={item} />
          ))}
        </Box>
      )}
    </>
  );
}

export default CollectionLinksView;
