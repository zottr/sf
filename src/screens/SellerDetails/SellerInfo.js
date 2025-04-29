import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../../context/FavoriteSellerContext';
import { useNavigate, useParams } from 'react-router-dom';

function SellerInfo({ adminData }) {
  const theme = useTheme();
  const { favoriteSellers, toggleFavorite } = useFavorites();
  const isFavorite = favoriteSellers.includes(adminData.id);
  const navigate = useNavigate();
  const query = useParams();

  return (
    <Container
      sx={{
        backgroundColor: 'hsl(48 88.2% 99.7%)',
        // backgroundColor: 'secondary.surface',
        // boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)',
        // boxShadow: '0px 1px 1px #4DB6AC',
        // boxShadow: '1px 1px 1px 4px #FFD54F',
        // borderBottomLeftRadius: '40px',
        // borderBottomRightRadius: '40px',
        borderRadius: '50px',
        border: '1px solid #FFD54F',
        width: '95%',
        p: 3,
      }}
    >
      <Stack className="flexCenter">
        <Avatar
          variant="circular"
          src={adminData.logo}
          alt={`${adminData.businessName} Logo`}
          sx={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
          }}
        />
        <Stack className="flexCenter" sx={{ mt: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'grey.800',
              wordBreak: 'break-word',
              textAlign: 'center',
            }}
          >
            {adminData.businessName}
          </Typography>
          <Typography
            variant="heavyb1"
            sx={{
              wordBreak: 'break-word',
              color: theme.palette.grey[600],
            }}
          >
            {adminData.tagline}
          </Typography>
        </Stack>
        <Grid container spacing={1} sx={{ mt: 3 }}>
          <Grid item xs={4} className="flexCenter">
            <Button
              className="flexCenter"
              sx={{
                width: '100%',
                height: '2rem',
                borderRadius: '15px',
                borderColor: 'secondary.main',
                bgcolor: 'primary.lightsurface',
                // height: '3rem',
                // bgcolor: 'primary.main',
                '&:hover, &:focus, &:active': {
                  // bgcolor: 'primary.main',
                  borderColor: 'secondary.main',
                  bgcolor: 'primary.lightsurface',
                },
              }}
              variant="contained"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <Typography variant="button2" sx={{ color: 'grey.700', mr: 1 }}>
                Talk
              </Typography>
              <QuestionAnswerIcon
                fontSize="small"
                sx={{ color: 'info.main' }}
              />
            </Button>
          </Grid>
          <Grid item xs={4} className="flexCenter">
            <Button
              className="flexCenter"
              sx={{
                width: '100%',
                // minWidth: '50%',
                height: '2rem',
                borderRadius: '15px',
                borderColor: 'secondary.main',
                bgcolor: 'primary.lightsurface',
                // height: '3rem',
                // bgcolor: 'primary.main',
                '&:hover, &:focus, &:active': {
                  // bgcolor: 'primary.main',
                  borderColor: 'secondary.main',
                  bgcolor: 'primary.lightsurface',
                },
              }}
              variant="contained"
              onClick={() => toggleFavorite(adminData.id)}
            >
              {isFavorite ? (
                <FavoriteIcon fontSize="small" sx={{ color: '#FF0000' }} />
              ) : (
                <FavoriteBorderIcon
                  fontSize="small"
                  sx={{ color: 'secondary.main' }}
                />
              )}
              <Typography variant="button2" sx={{ color: 'grey.700', ml: 0.5 }}>
                Favorite
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={4} className="flexCenter">
            <Button
              className="flexCenter"
              sx={{
                width: '100%',
                height: '2rem',
                borderRadius: '15px',
                borderColor: 'secondary.main',
                bgcolor: 'primary.lightsurface',
                // height: '3rem',
                // bgcolor: 'primary.main',
                '&:hover, &:focus, &:active': {
                  // bgcolor: 'primary.main',
                  borderColor: 'secondary.main',
                  bgcolor: 'primary.lightsurface',
                },
              }}
              variant="contained"
              onClick={() => {
                navigate(`/seller/${query.sellerId}/payments`);
              }}
            >
              <Typography variant="button2" sx={{ color: 'grey.700', mr: 0.5 }}>
                UPI
              </Typography>
              <CurrencyRupeeIcon
                fontSize="small"
                sx={{ color: 'hsl(145, 63%, 39%)' }}
              />
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        gap={1}
        direction="row"
        sx={{
          width: '100%',
          display: 'flex',
          // alignItems: 'flex-end',
          // justifyContent: 'flex-end',
        }}
      >
        {/* <Box
            sx={{
              display: 'flex',
              height: '52px',
            }}
          >
            <FavButton sellerId={adminData.id} />
          </Box>
          <IconButton onClick={() => openWhatsAppChat(phoneNumber)}>
            <WhatsAppIcon
              fontSize="medium"
              sx={{ color: 'hsl(142.4,70.2%,42.6%)' }}
            />
          </IconButton>
          <IconButton onClick={() => initiateAudioCall(phoneNumber)}>
            <CallIcon fontSize="medium" sx={{ color: 'hsl(217, 79%, 65%)' }} />
          </IconButton> */}
        {/* <Button
            variant="outlined"
            // onClick={toggleDialog}
            onClick={() => {
              navigate(`/seller/${query.sellerId}/payments`);
            }}
            sx={{
              height: '2.5rem',
              borderRadius: '15px',
              borderColor: theme.palette.grey[500],
            }}
          >
            <CurrencyRupeeIcon
              fontSize="small"
              sx={{
                color: 'hsl(145, 63%, 39%)',
                mr: 0.5,
              }}
            />
            <Typography variant="button2" color={theme.palette.grey[700]}>
              Payments
            </Typography>
          </Button> */}
      </Stack>
    </Container>
  );
}

export default SellerInfo;
