import { initiateAudioCall, openWhatsAppChat } from '../../utils/utils';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import { Box, IconButton, Tooltip } from '@mui/material';

function CallActionButtons({ phoneNumber, iconSize }) {
  return (
    <Box
      sx={{
        padding: 1,
        textAlign: 'center',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <Tooltip title="Whatsapp seller" placement="top">
        <IconButton
          color="success"
          onClick={() => openWhatsAppChat(phoneNumber)}
        >
          <WhatsAppIcon fontSize={iconSize} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Call seller" placement="top">
        <IconButton color="info" onClick={() => initiateAudioCall(phoneNumber)}>
          <CallIcon fontSize={iconSize} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default CallActionButtons;
