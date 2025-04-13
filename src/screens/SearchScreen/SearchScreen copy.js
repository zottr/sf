import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { SEARCH_SUGGESTIONS } from '../../apollo/server';
import { Link as RouterLink } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function SearchScreen() {
  const navigate = useNavigate();
  const [input, setInput] = React.useState('');
  const [fetchSuggestions, { data, loading, error }] = useLazyQuery(
    gql`
      ${SEARCH_SUGGESTIONS}
    `
  );
  React.useEffect(() => {
    if (input.length !== 0 && (input.length === 1 || input.length % 3 === 0)) {
      fetchSuggestions({
        variables: {
          input: {
            groupByProduct: true,
            term: input,
            take: 10,
          },
        },
      });
    }
  }, [input, fetchSuggestions]);

  let suggestions = [];
  let sellers = [
    'Taco & Bell',
    'Choco Kreations',
    'Dominos',
    'McDolands',
    'Naturals',
  ];

  if (data && data.search.items) {
    console.log(data.search.items);
    let i = 0;
    suggestions = data.search.items.map((item) => {
      let suggestion = {
        ...item,
        seller: sellers[i],
        sellerSlug: sellers[i].trim().replace(/\W+/g, '-').toLowerCase(),
      };
      i++;
      if (i === sellers.length) i = 0;
      return suggestion;
    });
  }

  function handleChange(value) {
    setInput(value);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              width: '90%',
              marginX: 'auto',
              marginTop: '15px',
              borderRadius: '50px',
              border: '1.5px solid purple',
            }}
          >
            <IconButton aria-label="go-back" onClick={() => navigate(-1)}>
              <NavigateBeforeIcon fontSize="large" sx={{ color: 'purple' }} />
            </IconButton>
            <InputBase
              placeholder="Search anything"
              autoFocus="true"
              onChange={(e) => handleChange(e.target.value)}
              value={input}
              sx={{
                width: '100%',
                marginRight: '10px',
                marginLeft: '10px',
                fontFamily: 'Kumbh Sans',
                fontSize: '18px',
                fontWeight: '500',
              }}
            />
          </Box>
        </Grid>
        {suggestions.length > 0 && input.length >= 1 && (
          <Grid item xs={12}>
            <Paper
              elevation={1}
              sx={{
                width: '90%',
                marginX: 'auto',
                marginTop: '10px',
                marginBottom: '10px',
                borderRadius: '25px',
              }}
            >
              <Stack
                direction="column"
                gap={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflowX: 'hidden',
                  paddingTop: '10px',
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <>
                    <Box
                      component={RouterLink}
                      to={`/${suggestion.sellerSlug}/${suggestion.slug}`}
                      sx={{ textDecoration: 'none' }}
                    >
                      <Grid container spacing={1} alignItems={'center'}>
                        <Grid item xs={3}>
                          <Avatar
                            alt={suggestion.productName}
                            src={suggestion.productAsset.preview}
                            variant="square"
                            sx={{
                              width: '48px',
                              height: '48px',
                              marginLeft: '20px',
                            }}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Stack>
                            <Typography
                              sx={{ fontWeight: '500', color: 'black' }}
                              noWrap
                            >
                              {suggestion.productName}
                            </Typography>
                            <Typography
                              sx={{ color: 'grey', fontSize: '14px' }}
                              noWrap
                            >
                              {suggestion.seller}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={2}>
                          <Stack alignItems={'center'} marginRight={'20px'}>
                            <IconButton aria-label="product-link">
                              <ArrowOutwardIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider flexItem variant="middle" sx={{ opacity: 0.7 }} />
                  </>
                ))}
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
}
export default SearchScreen;
