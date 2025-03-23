import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { SEARCH_PRODUCTS } from '../../apollo/server';
import ReactSearchBox from 'react-search-box';
import { Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './styles.css';
import { handleError } from '../../context/ErrorContext';

const PRODUCTS = gql`
  ${SEARCH_PRODUCTS}
`;

function AutoCompleteSearch(props) {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data, loading, error }] = useLazyQuery(PRODUCTS, {
    onError: (err) => handleError(err),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="searchBox">
      <ReactSearchBox
        inputBorderColor="black"
        placeholder="Search products..."
        data={props.data}
        onSelect={(record) =>
          executeSearch({
            variables: {
              input: {
                groupByProduct: true,
                term: record.item.value,
              },
            },
          })
        }
        onFocus={() => {
          console.log('This function is called when is focussed');
        }}
        onChange={(e) => setSearchFilter(e)}
        leftIcon={<SearchIcon />}
        iconBoxSize="48px"
      />
      {data?.search?.items &&
        data.search.items.map((col) => (
          <Grid container spacing={2} key={col.productId}>
            <Grid item>
              <img
                src={`${col?.productAsset?.preview.replace(/\\/g, '/')}`}
                alt={col.productName}
                width={'50px'}
                height={'50px'}
              />
            </Grid>
            <Grid item>
              <Typography>{col.productName}</Typography>
            </Grid>
          </Grid>
        ))}
    </div>
  );
}

export default AutoCompleteSearch;
