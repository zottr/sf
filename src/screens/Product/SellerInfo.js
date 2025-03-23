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
import { initiateAudioCall, openWhatsAppChat } from '../../Utils/utils';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function SellerInfo({ imageUrl, name, id }) {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        mb: 1,
      }}
    >
      <Stack
        direction="row"
        className="flexLeft"
        gap={0.8}
        sx={{ maxWidth: '80%' }}
      >
        <Avatar
          alt={name}
          src={imageUrl}
          sx={{
            width: 42,
            height: 42,
            border: '1px solid rgba(200,200,200,1)',
          }}
        />
        <Stack>
          <Typography
            variant="heavyb2"
            sx={{
              // color: 'hsl(217, 79%, 41%)',
              color: theme.palette.grey[900],
            }}
          >
            {name}
          </Typography>
          <Link
            color="primary.dark"
            underline="none"
            component={RouterLink}
            to={`/seller/${id}`}
          >
            view store
          </Link>
        </Stack>
      </Stack>
      <Stack className="flexRight" direction="row" gap={1} sx={{}}>
        <Tooltip title="Whatsapp seller" placement="top" sx={{ p: 0 }}>
          <IconButton onClick={() => openWhatsAppChat(adminData?.phoneNumber)}>
            <WhatsAppIcon
              sx={{ color: 'hsl(142.4,70.2%,42.6%)', fontSize: '22px' }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Call seller" placement="top" sx={{ p: 0 }}>
          <IconButton
            color="info"
            onClick={() => initiateAudioCall(adminData?.phoneNumber)}
          >
            <CallIcon sx={{ color: 'hsl(217, 79%, 65%)', fontSize: '22px' }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default SellerInfo;
