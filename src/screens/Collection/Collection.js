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
  const [skip, setSkip] = useState(0);
  const take = 10;

  // Fetch collection details from slug
  const collection = collections?.find((c) => c.slug === slug);

  const [fetchProducts, { loading: initialLoading }] = useLazyQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const newProducts = data?.collection.productVariants?.items || [];
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
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
      <Box>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', paddingBottom: 4, display: 'flex' }}
        >
          <Link to="/" style={{ textDecoration: 'none', margin: 0 }}>
            <Box display="flex" alignItems="center">
              <IconButton sx={{ position: 'absolute', marginLeft: '30px' }}>
                <WestIcon fontSize="small" sx={{ color: 'brown' }} />
              </IconButton>
            </Box>
          </Link>
          <Typography
            variant="h6"
            color={theme.palette.grey[900]}
            sx={{ margin: 'auto', textAlign: 'center' }}
          >
            {collection?.name}
          </Typography>
        </Stack>
      </Box>

      {/* Product layouts */}
      <DoubleCellLayoutType1 products={products} />

      {/* Loading more spinner */}
      {isLoadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {/* No more products message */}
      {!hasMore && (
        <Typography variant="body2" align="center" color="textSecondary">
          No more products to load
        </Typography>
      )}
    </>
  );
}

export default Collection;
