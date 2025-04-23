import { useState, useEffect, useCallback, useContext } from 'react';
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
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const newProducts = data?.collection.productVariants?.items || [];
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setInitialLoadCompleted(true);
      setHasMore(newProducts.length === take); // Stop loading if fewer products than `take` are returned
      setIsLoadingMore(false);
    },
    onError: (err) => handleError(err),
  });

  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || !hasMore || initialLoading) return;

    setIsLoadingMore(true);
    setSkip((prevSkip) => {
      const newSkip = prevSkip + take;
      fetchProducts({
        variables: {
          slug: slug,
          options: { skip: newSkip, take, sort: { updatedAt: 'DESC' } },
        },
      });
      return newSkip;
    });
  }, [fetchProducts, hasMore, isLoadingMore, skip, take]);

  // Reset state when `slug` changes
  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setIsLoadingMore(false);

    // Fetch products for the new `slug`
    // Wait for state to reset before fetching products
    setTimeout(() => {
      fetchProducts({
        variables: {
          slug: slug,
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
        hasMore &&
        !isLoadingMore
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, hasMore, isLoadingMore]);

  return collectionLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      {/* Collection header */}
      <CollectionBreadcrumbs name={collection?.name} />
      <Stack sx={{ alignItems: 'center', display: 'flex', mt: 2, mb: 3 }}>
        <Typography
          variant="h5"
          color={theme.palette.grey[900]}
          sx={{ margin: 'auto', textAlign: 'center' }}
        >
          {collection?.name}
        </Typography>
      </Stack>
      {collection?.slug !== 'services' && products.length !== 0 && (
        <DoubleCellLayoutType1 products={products} />
      )}
      {products.length === 0 && initialLoadCompleted && (
        <Stack gap={1} sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
          <Typography
            variant="h7"
            sx={{ color: 'grey.600', textAlign: 'center' }}
          >
            There are no products in this category
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
          <Typography variant="heavyb2" color="brown">
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
