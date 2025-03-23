import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '../apollo/server';
import { handleError } from './ErrorContext';

const COLLECTIONS = gql`
  ${GET_COLLECTIONS}
`;

const CollectionsContext = React.createContext({});

export const CollectionsProvider = (props) => {
  const { data, loading, error } = useQuery(COLLECTIONS, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return <>{handleError(error)}</>;
  }

  const collections =
    loading || error || !data.collections ? [] : data.collections.items;

  return (
    <CollectionsContext.Provider value={{ collections, loading }}>
      {props.children}
    </CollectionsContext.Provider>
  );
};

export const CollectionsConsumer = CollectionsContext.Consumer;
export default CollectionsContext;
