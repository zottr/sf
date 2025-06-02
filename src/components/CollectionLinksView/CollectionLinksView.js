import React from 'react';
import { Box, CircularProgress, Skeleton, useTheme } from '@mui/material';
import CollectionLink from './CollectionLink';
import CollectionsContext from '../../context/CollectionsContext';
import CollectionLinksViewSkeleton from './CollectionLinksViewSkeleton';

function CollectionLinksView() {
  const { collections, loading } = React.useContext(CollectionsContext);
  const theme = useTheme();

  const desiredOrder = [
    'services',
    'food-and-drinks',
    'grocery-and-essentials',
    'clothing-and-accessories',
    'beauty-and-grooming',
    'household-items',
    'home-and-decor',
  ];

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
          {collections
            ?.slice()
            .sort(
              (a, b) =>
                (desiredOrder.indexOf(a.slug) === -1
                  ? 999
                  : desiredOrder.indexOf(a.slug)) -
                (desiredOrder.indexOf(b.slug) === -1
                  ? 999
                  : desiredOrder.indexOf(b.slug))
            )
            .map((item) => (
              <CollectionLink key={item.id} item={item} />
            ))}
        </Box>
      )}
    </>
  );
}

export default CollectionLinksView;
