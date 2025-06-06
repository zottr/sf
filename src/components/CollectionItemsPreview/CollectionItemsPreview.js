import React from 'react';
import HorizontalScroll from './HorizontalScroll';
import './styles.css';
import { Box, CircularProgress, Stack, useTheme } from '@mui/material';
import CollectionsContext from '../../context/CollectionsContext';
import CollectionItemsPreviewSkeleton from './CollectionItemsPreviewSkeleton';

function CollectionItemsPreview() {
  const theme = useTheme();
  const { collections, loading } = React.useContext(CollectionsContext);

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
            marginTop: 2,
          }}
        >
          <CollectionItemsPreviewSkeleton />
        </Box>
      )}
      {/* <Box sx={{ backgroundColor: theme.palette.background.default }}> */}
      {!loading && (
        <Stack spacing={5}>
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
            .map((collection) => (
              <HorizontalScroll
                key={collection.slug ?? collection.id}
                collection={collection}
              />
            ))}
          {/* {collections?.map((collection) => (
            <HorizontalScroll
              key={collection.slug ?? collection.id}
              collection={collection}
            />
          ))} */}
        </Stack>
      )}
      {/* </Box> */}
    </>
  );
}

export default CollectionItemsPreview;
