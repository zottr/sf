import React from 'react';
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Link,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { initiateAudioCall, openWhatsAppChat } from '../../utils/CommonUtils';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import logo from '/logos/zottr_logo_small1_white.svg';
import useAdminInfo from '../../customhooks/useAdminInfo';

function SellerInfo({ imageUrl, name, id }) {
  const { adminData } = useAdminInfo({ adminId: id });
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      sx={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link
        component={RouterLink}
        to={`/seller/${id}`}
        underline="none"
        direction="row"
        className="flexLeft"
        gap={0.8}
        sx={{
          maxWidth: '80%',
        }}
      >
        <Avatar
          alt={name}
          src={imageUrl}
          sx={{
            width: '2.5rem',
            height: '2.5rem',
            border: '1px solid rgba(200,200,200,1)',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: '80%', width: '80%' }}
          />
        </Avatar>
        <Stack>
          <Typography variant="heavyb2" sx={{ color: 'grey.900' }}>
            {name}
            {/* Rohit's store */}
          </Typography>
          <Typography variant="heavyb3" className="customLink">
            Visit the store
          </Typography>
        </Stack>
      </Link>
      <Stack className="flexRight" direction="row" gap={1.5} sx={{ mr: 1 }}>
        <Tooltip title="Whatsapp seller" placement="top" sx={{ p: 0 }}>
          <IconButton onClick={() => openWhatsAppChat(adminData?.phoneNumber)}>
            <WhatsAppIcon
              fontSize="medium"
              sx={{ color: 'hsl(142.4,70.2%,42.6%)' }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Call seller" placement="top" sx={{ p: 0 }}>
          <IconButton
            color="info"
            onClick={() => initiateAudioCall(adminData?.phoneNumber)}
          >
            <CallIcon fontSize="medium" sx={{ color: 'hsl(217, 79%, 65%)' }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default SellerInfo;
