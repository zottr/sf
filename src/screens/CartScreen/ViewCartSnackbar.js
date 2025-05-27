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
import placeholderLogo from '/logos/zottr_logo_small2_grey_white.svg';

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
          left: { md: '3px' },
          zIndex: 1200,
        }}
      >
        <Button
          onClick={() => navigate('/cart')}
          size="small"
          variant="contained"
          sx={{
            borderRadius: '50px',
            backgroundColor: 'primary.light',
            '&:hover, &:focus, &:active': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <AvatarGroup spacing={28} variant="circular">
              {topItems?.map((item) => (
                <Avatar
                  key={item.id || index}
                  src={`${item?.featuredAsset?.preview}?preset=small`}
                >
                  <Box
                    component="img"
                    src={placeholderLogo}
                    alt="Logo"
                    sx={{ height: '100%', width: '100%', bgcolor: 'white' }}
                  />
                </Avatar>
              ))}
            </AvatarGroup>
            <Stack>
              <Typography variant="button1" sx={{ color: 'secondary.dark' }}>
                View cart
              </Typography>
              <Typography variant="heavyb2" sx={{ color: 'secondary.dark' }}>
                {activeOrder?.totalQuantity} items
              </Typography>
            </Stack>
            <ChevronRightIcon
              // sx={{ color: 'hsl(33 100% 26.7%)', fontSize: '30px' }}
              sx={{ color: 'secondary.dark', fontSize: '32px' }}
            />
          </Stack>
        </Button>
      </Box>
    </Slide>
  );
};

export default ViewCartSnackbar;
