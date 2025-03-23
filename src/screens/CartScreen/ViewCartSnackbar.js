import React from 'react';
import {
  Button,
  Typography,
  Box,
  Slide,
  Paper,
  AvatarGroup,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ViewCartSnackbar = ({ open, message, activeOrder }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  let items = activeOrder?.lines;
  const topItems = items?.slice(0, 3);

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          bottom: '10px',
          zIndex: 1200,
          // boxShadow: 3,
        }}
      >
        <Button
          onClick={() => navigate('/cart')}
          size="small"
          variant="contained"
          sx={{
            borderRadius: '50px',
            // borderColor: 'hsl(33 100% 86.7%)',
            backgroundColor: 'hsl(38 88.2% 98%)',
            '&:hover': {
              backgroundColor: 'hsl(46, 70%, 50%)',
            },
            '&:focus': {
              backgroundColor: 'hsl(46, 70%, 50%)',
            },
            '&:active': {
              backgroundColor: 'hsl(46, 70%, 50%)',
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <AvatarGroup spacing={28} variant="circular">
              {topItems?.map((item) => (
                <Avatar src={`${item.featuredAsset.preview}?preset=thumb`} />
              ))}
            </AvatarGroup>
            <Stack>
              <Typography
                variant="button2"
                sx={{ color: 'hsl(33 100% 26.7%)' }}
              >
                View Cart
              </Typography>
              <Typography
                variant="heavyb3"
                sx={{ color: 'hsl(33 100% 26.7%)' }}
              >
                {activeOrder?.totalQuantity} items
              </Typography>
            </Stack>
            <ChevronRightIcon
              fontSize="medium"
              sx={{ color: 'hsl(33 100% 26.7%)' }}
            />
          </Stack>
        </Button>
      </Box>
    </Slide>
  );
};

export default ViewCartSnackbar;
