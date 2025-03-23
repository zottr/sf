import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SEARCH_PRODUCTS } from '../../apollo/server';
import { gql, useLazyQuery } from '@apollo/client';
import DoubleCellLayoutType1 from '../../components/CollectionLayout/DoubleCellLayoutType1';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';

const SEARCH_PRODUCTS_QUERY = gql`
  ${SEARCH_PRODUCTS}
`;

function SearchResults({ input }) {
  // const { input } = useParams();
  const prevInput = useRef(input);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 10;
  let totalItems = 0;

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

  if (error) {
    return <>{handleError(error)}</>;
  }

  return (
    <Box>
      <Typography variant="h5">Search Results for '{input}'</Typography>

      {results.length > 0 && <DoubleCellLayoutType1 products={results} />}

      {!loading && totalItems > take && results.length === 0 && (
        <div>No products found.</div>
      )}

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
    </Box>
  );
}

export default SearchResults;
