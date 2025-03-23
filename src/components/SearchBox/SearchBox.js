import React from 'react';
import AutoCompleteSearch from './AutoCompleteSearch';
import { gql, useQuery } from '@apollo/client';
import { GET_PRODUCT_NAMES } from '../../apollo/server';
import { CircularProgress, Box } from '@mui/material';
import { handleError } from '../../context/ErrorContext';

const PRODUCT_NAMES = gql`
  ${GET_PRODUCT_NAMES}
`;

const SearchBox = () => {
  const { data, loading, error } = useQuery(PRODUCT_NAMES, {
    fetchPolicy: 'cache-and-network',
  });

  const names = data?.products?.items;

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          minHeight: '150px', // Adjust height as needed
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <>{handleError(error)}</>;
  }

  return <AutoCompleteSearch data={names} />;
};

export default SearchBox;
