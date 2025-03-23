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
import { GET_PRODUCTS } from '../../apollo/server';
import CollectionsContext from '../../context/CollectionsContext';
import WestIcon from '@mui/icons-material/West';
import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';

import { Link } from 'react-router-dom';
import Banner from '../../components/Common/Banner';

const PRODUCTS = gql`
  ${GET_PRODUCTS}
`;

function Collection() {
  const theme = useTheme();
  const query = useParams();
  const { collections, loading: collectionLoading } =
    useContext(CollectionsContext);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 10;
  let totalItems = 0;

  //fetch collection name from slug
  let collection = collections?.find((c) => c.slug === query.slug);
  const collectionBannerImage =
    collection?.customFields?.banner?.preview?.replace(/\\/g, '/');

  const [fetchProducts] = useLazyQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data?.search?.items?.length < take) {
        setHasMore(false); // No more products to load
      }
      setProducts((prevProducts) => [...prevProducts, ...data?.search?.items]);
      setLoading(false);
      totalItems = data?.search?.totalItems;
    },
  });

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    fetchProducts({
      variables: {
        input: {
          collectionSlug: query.slug,
          groupByProduct: true,
          skip,
          take,
        },
      },
    });
    setSkip((prevSkip) => prevSkip + take);
  }, [fetchProducts, hasMore, loading, skip, take, query]);

  useEffect(() => {
    loadMoreProducts(); // Initial fetch
  }, []);

  // Infinite scrolling function
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        hasMore &&
        !loading
      ) {
        loadMoreProducts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, hasMore, loading]);

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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DoubleCellLayoutType1 products={products} />
      )}

      {/* No more products message */}
      {totalItems > take && !hasMore && (
        <Typography variant="b2" align="center" color="textSecondary">
          No more products to load
        </Typography>
      )}
    </>
  );
}
export default Collection;
