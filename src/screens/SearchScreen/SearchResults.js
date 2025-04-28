import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SEARCH_PRODUCTS } from '../../apollo/server';
import { gql, useLazyQuery } from '@apollo/client';
import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Box,
  Typography,
  Stack,
  Grid,
  useTheme,
  Container,
  Button,
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { handleError } from '../../context/ErrorContext';

const SEARCH_PRODUCTS_QUERY = gql`
  ${SEARCH_PRODUCTS}
`;

function SearchResults() {
  const { input } = useParams();
  const prevInput = useRef(input);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 10;
  let totalItems = 0;
  const theme = useTheme();
  const [fetchSuggestions, { error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data?.search?.items) {
        setResults((prevResults) =>
          skip === 0
            ? data.search.items
            : [...prevResults, ...data.search.items]
        );
        if (data.search.items.length < take) {
          setHasMore(false);
        }
      }
      setLoading(false);
      totalItems = data?.search?.totalItems;
    },
    onError: (err) => handleError(err),
  });

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    if (prevInput.current !== input) {
      setResults([]);
      setSkip(0);
      setHasMore(true);
      initialFetch();
    }
    prevInput.current = input;
  }, [input]);

  const loadMoreResults = useCallback(() => {
    if (loading && !hasMore) return;
    setLoading(true);
    fetchSuggestions({
      variables: {
        input: {
          groupByProduct: true,
          term: input,
          skip,
          take,
        },
      },
    });
    setSkip((prevSkip) => prevSkip + take);
  }, [fetchSuggestions, loading, skip, take, hasMore, input]);

  const initialFetch = () => {
    setLoading(true);
    fetchSuggestions({
      variables: {
        input: {
          groupByProduct: true,
          term: input,
          skip: 0,
          take,
        },
      },
    });
    setSkip((prevSkip) => prevSkip + take);
  };

  // Infinite scroll listener with debounce
  useEffect(() => {
    let debounceTimer;
    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        if (
          scrollTop + clientHeight >= scrollHeight - 100 &&
          hasMore &&
          !loading
        ) {
          loadMoreResults();
        }
      }, 100); // 100ms debounce
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  const mapResultsToProducts = (results) => {
    return results?.map((item) => ({
      product: {
        id: item.productId,
        name: item.productName,
        slug: item.slug,
        description: item.description,
        featuredAsset: item.productAsset
          ? {
              id: item.productAsset.id,
              preview: item.productAsset.preview,
            }
          : null,
        variants: [
          {
            price: item.priceWithTax?.min ?? 0,
          },
        ],
      },
    }));
  };

  if (error) {
    return <>{handleError(error)}</>;
  }

  return (
    <>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Container>
            <Typography
              variant="heavylabel1"
              sx={{ color: theme.palette.grey[800] }}
            >
              Search results for "{input}"
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12}>
          {results.length > 0 && (
            <DoubleCellLayoutType1 products={mapResultsToProducts(results)} />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {!loading && results.length === 0 && (
            <Stack sx={{ marginTop: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <SearchOffIcon
                  sx={{
                    fontSize: '48px',
                    color: theme.palette.grey[500],
                    marginX: 'auto',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.grey[500], textAlign: 'center' }}
              >
                No results found
              </Typography>
              <Typography
                variant="heavyb2"
                sx={{ color: theme.palette.grey[500], textAlign: 'center' }}
              >
                Try searching again
              </Typography>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12}>
          {loading && hasMore && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default SearchResults;
