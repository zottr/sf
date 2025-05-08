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
import { forwardRef, useEffect, useState } from 'react';

// Custom Backdrop with blur effect
const CustomBackdrop = (props) => {
  return (
    <div
      {...props}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)', // Add blur effect
        zIndex: -1, // Ensure it stays behind the dialog content
      }}
    />
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function SearchScreen({ open, close }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fetchSuggestions, { data, loading, error }] = useLazyQuery(
    gql`
      ${SEARCH_SUGGESTIONS}
    `
  );

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (input.length !== 0 && (input.length === 1 || input.length % 3 === 0)) {
      fetchSuggestions({
        variables: {
          input: {
            groupByProduct: true,
            term: input,
            take: 6,
          },
        },
      });
    }
  }, [input, fetchSuggestions]);

  // Update suggestions when `data` changes
  useEffect(() => {
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
      navigate(`/search/${input}`);
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
        // fullScreen
        open={open}
        onClose={() => {
          setInput('');
          close();
        }}
        TransitionComponent={Transition}
        // BackdropComponent={CustomBackdrop} // Use custom backdrop for the blur effect
        sx={{
          '& .MuiDialog-paper': {
            position: 'absolute',
            top: 0, // Ensures the dialog stays at the top
            left: 0,
            right: 0,
            bottom: 'auto', // Prevents it from going downwards
            // maxHeight: '80vh', // Set a max height to ensure the dialog stays within view
            borderRadius: 0, // Optional: You can remove rounded corners
            backgroundColor: 'transparent', // Make dialog content transparent
            boxShadow: 'none', // Remove shadow for a cleaner look
          },
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              elevation={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                width: '100%',
                marginX: 'auto',
                borderRadius: '50px',
                backgroundColor: theme.palette.common.white,
              }}
            >
              <IconButton aria-label="go-back" onClick={close}>
                <NavigateBeforeIcon
                  sx={{ color: theme.palette.grey[800], fontSize: '32px' }}
                />
              </IconButton>
              <InputBase
                placeholder="Search"
                autoFocus={true}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyPress}
                value={input}
                inputProps={{
                  maxLength: 100, // Limit the number of characters to 100
                }}
                sx={{
                  width: '100%',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.b1.fontSize,
                  fontWeight: theme.typography.b1.fontWeight,
                  color: theme.palette.common.black,
                }}
              />
              <IconButton aria-label="search" onClick={handleSearch}>
                <SearchIcon
                  sx={{ color: theme.palette.grey[800], fontSize: '28px' }}
                />
              </IconButton>
            </Box>
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }}
              >
                <CircularProgress size={50} thickness={4} />
              </Box>
            </Grid>
          )}
          {!loading && suggestions.length > 0 && input.length >= 1 && (
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{
                  width: '100%',
                  marginX: 'auto',
                  marginTop: '5px',
                  paddingBottom: '20px',
                  borderRadius: '30px',
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
                        to={`/product/${suggestion.slug}`}
                        onClick={() => {
                          close();
                          setInput('');
                        }}
                        sx={{ textDecoration: 'none' }}
                      >
                        <Grid
                          container
                          spacing={1}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Grid
                            item
                            xs={4}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                          >
                            <Avatar
                              alt={suggestion.productName}
                              src={`${suggestion.productAsset?.preview}?preset=small`}
                              variant="rounded"
                              sx={{
                                width: '60px',
                                height: '60px',
                              }}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <Stack>
                              <Typography
                                variant="b1"
                                color={theme.palette.grey[900]}
                                noWrap
                              >
                                {suggestion.productName}
                              </Typography>
                              {/* <Typography
                                variant="b3"
                                color={theme.palette.grey[700]}
                                noWrap
                              >
                                {getRandomSeller()}
                              </Typography> */}
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                      {/* <Divider
                        flexItem
                        variant="middle"
                        sx={{ opacity: 0.7 }}
                      /> */}
                    </>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Dialog>
    </>
  );
}
export default SearchScreen;
