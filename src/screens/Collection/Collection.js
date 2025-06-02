import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_COLLECTION_PRODUCTS } from '../../apollo/server';
import CollectionsContext from '../../context/CollectionsContext';
import WestIcon from '@mui/icons-material/West';
import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';

import { Link } from 'react-router-dom';
import { handleError } from '../../context/ErrorContext';
import ServicesCollectionLayout from '../../components/CollectionLayout/ServicesCollectionLayout';
import CollectionBreadcrumbs from './CollectionBreadcrumbs';
import noItemsFoundImage from '/images/no_items_found.svg';

const PRODUCTS = gql`
  ${GET_COLLECTION_PRODUCTS}
`;

function Collection() {
  const loadingRef = useRef(false);
  const lastRequestedSkipRef = useRef(0);

  const theme = useTheme();
  const { slug } = useParams();
  const { collections, loading: collectionLoading } =
    useContext(CollectionsContext);

  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 10;
  // Fetch collection details from slug
  const collection = collections?.find((c) => c.slug === slug);
  const [fetchProducts, { loading: initialLoading }] = useLazyQuery(PRODUCTS, {
    onCompleted: (data) => {
      const newProducts = data?.collection.productVariants?.items || [];
      // If skip is 0, this is an initial load — replace
      if (lastRequestedSkipRef.current === 0) {
        setProducts(newProducts);
      } else {
        // Otherwise, append
        setProducts((prev) => [...prev, ...newProducts]);
      }
      setInitialLoadCompleted(true);
      setHasMore(newProducts.length === take);
      setIsLoadingMore(false);
      loadingRef.current = false;
    },
    onError: (err) => {
      handleError(err);
      setIsLoadingMore(false);
      loadingRef.current = false;
    },
  });

  const loadMoreProducts = useCallback(() => {
    if (loadingRef.current || !hasMore || initialLoading) return;

    const newSkip = skip + take;
    loadingRef.current = true;
    lastRequestedSkipRef.current = newSkip;

    fetchProducts({
      variables: {
        slug,
        options: { skip: newSkip, take, sort: { updatedAt: 'DESC' } },
      },
    });

    setSkip(newSkip);
  }, [fetchProducts, hasMore, initialLoading, skip, take, slug]);

  // Reset state when `slug` changes
  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setIsLoadingMore(false);
    setInitialLoadCompleted(false);
    loadingRef.current = false;
    lastRequestedSkipRef.current = 0;

    setTimeout(() => {
      fetchProducts({
        variables: {
          slug,
          options: { skip: 0, take, sort: { updatedAt: 'DESC' } },
        },
      });
    }, 0);
  }, [slug]);

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasMore
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, hasMore]);

  return collectionLoading && !initialLoadCompleted ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
          mt: 10,
        }}
      >
        <CircularProgress thickness={4} size={50} />
      </Box>
    </Box>
  ) : (
    <>
      {/* Collection header */}
      <CollectionBreadcrumbs name={collection?.name} />
      <Stack sx={{ alignItems: 'center', display: 'flex', mt: 2, mb: 4 }}>
        <Typography
          variant="h5"
          color={theme.palette.grey[900]}
          sx={{ margin: 'auto', textAlign: 'center' }}
        >
          {collection?.name}
        </Typography>
      </Stack>
      {initialLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 2,
            mt: 10,
          }}
        >
          <CircularProgress thickness={4} size={50} />
        </Box>
      )}
      {collection?.slug !== 'services' && products.length !== 0 && (
        <DoubleCellLayoutType1 products={products} />
      )}
      {initialLoadCompleted && products.length === 0 && (
        <Stack gap={2} sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
          <Typography
            variant="h6"
            sx={{ color: 'grey.500', textAlign: 'center' }}
          >
            There are no products in this category.
          </Typography>
          <Box
            component="img"
            sx={{
              width: '60%',
              objectFit: 'contain',
              objectPosition: 'center',
              borderRadius: '10px',
            }}
            src={noItemsFoundImage}
          />
        </Stack>
      )}
      {collection?.slug === 'services' && (
        <ServicesCollectionLayout products={products} />
      )}

      {/* Loading more spinner */}
      {isLoadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* No more products message */}
      {!hasMore && products.length !== 0 && (
        <Stack
          direction="row"
          sx={{
            mt: 4,
            height: '50px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
        >
          <Typography variant="heavyb1" color="brown">
            That's all!
          </Typography>
          <Typography variant="b1" sx={{ fontSize: '20px' }}>
            &#x1F44B;
          </Typography>
        </Stack>
      )}
    </>
  );
}

export default Collection;
