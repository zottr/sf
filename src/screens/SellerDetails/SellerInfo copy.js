import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavButton from './FavButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';

function SellerInfo({ adminData }) {
  const theme = useTheme();

  return (
    <Container
      sx={{
        backgroundColor: 'hsl(48 88.2% 99%)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        // borderRadius: 5,
        borderBottomLeftRadius: '45px',
        borderBottomRightRadius: '45px',
        width: '100%',
        paddingY: 2,
        margin: 'auto',
      }}
    >
      <Stack
        gap={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Stack
          direction="row"
          gap={1}
          sx={{
            // backgroundColor: 'hsl(48 88.2% 98%)',
            // borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <Avatar
            src={adminData.logo}
            alt={`${adminData.businessName} Logo`}
            sx={{
              width: '42px',
              height: '42px',
              padding: 1,
              boxShadow: '0px 4px 10px rgba(255, 0, 0, 0.1)',
            }}
          />
          <Stack>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                wordBreak: 'break-word',
              }}
            >
              {adminData.businessName}
            </Typography>
            <Typography
              variant="heavyb2"
              sx={{
                wordBreak: 'break-word',
                color: theme.palette.grey[700],
              }}
            >
              {adminData.tagline}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              height: '52px',
              alignItems: 'flex-start',
            }}
          >
            <FavButton sellerId={adminData.id} />
          </Box>
        </Stack>
        <Stack
          gap={1}
          direction="row"
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={() => openWhatsAppChat(phoneNumber)}>
            <WhatsAppIcon
              fontSize="medium"
              sx={{ color: 'hsl(142.4,70.2%,42.6%)' }}
            />
          </IconButton>
          <IconButton onClick={() => initiateAudioCall(phoneNumber)}>
            <CallIcon fontSize="medium" sx={{ color: 'hsl(217, 79%, 65%)' }} />
          </IconButton>
          <Button
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
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SellerInfo;
