import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  Grid,
  Slide,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { gql, useLazyQuery } from '@apollo/client';
import { SEARCH_SUGGESTIONS } from '../../apollo/server';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SearchIcon from '@mui/icons-material/Search';
import { handleError } from '../../context/ErrorContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SearchScreen({ open, close }) {
  const [input, setInput] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [fetchSuggestions, { data, loading, error }] = useLazyQuery(
    gql`
      ${SEARCH_SUGGESTIONS}
    `
  );

  const theme = useTheme();
  const navigate = useNavigate();

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

  // Update suggestions when `data` changes
  React.useEffect(() => {
    if (data && data.search?.items) {
      setSuggestions(data.search.items);
    }
  }, [data]);

  if (error) {
    return <>{handleError(error)}</>;
  }

  function handleChange(value) {
    setInput(value);
  }

  function handleSearch() {
    if (input.length > 0) {
      close();
      navigate(`/search/results/${input}`);
      setInput('');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
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
                border: '1.5px solid',
                borderColor: theme.palette.secondary.main,
              }}
            >
              <IconButton aria-label="go-back" onClick={close}>
                <NavigateBeforeIcon
                  fontSize="large"
                  sx={{ color: theme.palette.secondary.main }}
                />
              </IconButton>
              <InputBase
                placeholder="Search"
                autoFocus={true}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyPress}
                value={input}
                sx={{
                  width: '100%',
                  marginRight: '10px',
                  marginLeft: '10px',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.body1.fontSize,
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.common.black,
                }}
              />
              <IconButton aria-label="search" onClick={handleSearch}>
                <SearchIcon
                  fontSize="medium"
                  sx={{ color: theme.palette.secondary.main }}
                />
              </IconButton>
            </Box>
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                }}
              >
                <CircularProgress size={24} />
              </Box>
            </Grid>
          ) : (
            suggestions.length > 0 &&
            input.length >= 1 && (
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
                                src={suggestion.productAsset?.preview}
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
                                  variant="b1"
                                  color={theme.palette.common.black}
                                  noWrap
                                >
                                  {suggestion.productName}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  color={theme.palette.grey[500]}
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
                        <Divider
                          flexItem
                          variant="middle"
                          sx={{ opacity: 0.7 }}
                        />
                      </>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </Dialog>
    </>
  );
}
export default SearchScreen;
