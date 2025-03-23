import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '../apollo/server';
import './styles.css';
import { Box } from '@mui/material';
import CollectionLink from '../components/CollectionLinksView/CollectionLink';

const COLLECTIONS = gql`
  ${GET_COLLECTIONS}
`;

function CollectionLinksView() {
  const { data, loading, error } = useQuery(COLLECTIONS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const collections = data?.collections?.items;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
      }}
      marginTop="1rem"
    >
      {collections.map((item) => (
        <CollectionLink key={item.id} item={item} />
      ))}
    </Box>
  );
}

export default CollectionLinksView;
