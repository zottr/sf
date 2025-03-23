import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { SEARCH_PRODUCTS } from '../../apollo/server';
import ReactSearchBox from 'react-search-box';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './styles.css';

const PRODUCTS = gql`
  ${SEARCH_PRODUCTS}
`;

function AutoCompleteSearch(props) {
  const theme = useTheme();

  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data, loading, error }] = useLazyQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box
      sx={{ display: 'flex', backgroundColor: theme.palette.primary.dark }}
      paddingTop={0}
      marginTop={0}
    >
      <Box
        sx={{
          width: '100%',
          marginX: '1.2rem',
        }}
      >
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
          leftIcon={<SearchIcon fontSize="large" color="success" />}
          iconBoxSize="48px"
        />
      </Box>
    </Box>
  );
}

export default AutoCompleteSearch;
