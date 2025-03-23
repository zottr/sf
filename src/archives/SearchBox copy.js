import React from 'react';
import AutoCompleteSearch from '../components/SearchBox/AutoCompleteSearch';
import { gql, useQuery } from '@apollo/client';
import { GET_PRODUCT_NAMES } from '../apollo/server';

const PRODUCT_NAMES = gql`
  ${GET_PRODUCT_NAMES}
`;

const SearchBox = () => {
  const { data, loading, error } = useQuery(PRODUCT_NAMES, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const names = data?.products?.items;
  return <AutoCompleteSearch data={names} />;
};

export default SearchBox;
