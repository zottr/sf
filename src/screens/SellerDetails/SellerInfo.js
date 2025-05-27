import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../../context/FavoriteSellerContext';
import { useNavigate, useParams } from 'react-router-dom';
import ContactSellerDialog from '../../components/shared/ContactSellerDialog';
import ShareButton from '../../components/shared/ShareButton';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from '@mui/icons-material/Close';
import { stripHtml } from '../../utils/CommonUtils';

function SellerInfo({ adminData }) {
  const theme = useTheme();
  const { favoriteSellers, toggleFavorite } = useFavorites();
  const isFavorite = favoriteSellers.includes(adminData.id);
  const navigate = useNavigate();
  const query = useParams();

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const [toastOpen, setToastOpen] = useState(false);

  const handleShare = async (text, url) => {
    const message = `${stripHtml(text)}\n\n${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setToastOpen(true); // Show toast notification
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };
  let x = 0;
  return (
    <Container
      sx={{
        backgroundColor: 'hsl(48 88.2% 99.7%)',
        borderRadius: '50px',
        border: '1px solid #FFD54F',
        width: '95%',
        p: 2,
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
        <Grid container columnSpacing={1} rowSpacing={1.5} sx={{ mt: 3 }}>
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
          <Grid item xs={12} className="flexCenter">
            <Button
              className="flexCenter"
              onClick={() => {
                handleShare(
                  adminData.tagline,
                  `${window.location.href.replace(/\/$/, '')}/share`
                );
              }}
              variant="standard"
              sx={{
                width: '50%',
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
            >
              <Typography
                variant="button1"
                sx={{ color: 'info.main', mr: 0.5 }}
              >
                Share
              </Typography>
              <ReplyIcon
                fontSize="medium"
                sx={{ transform: 'scaleX(-1)', color: 'info.main' }}
              />
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <ContactSellerDialog
        open={openDialog}
        onClose={closeDialog}
        admin={adminData}
      />
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000} // Closes after 3 seconds
        onClose={() => setToastOpen(false)}
        message="Store Link copied to clipboard!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setToastOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
}

export default SellerInfo;
