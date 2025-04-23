import { Button, Snackbar, IconButton, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import { stripHtml } from '../../utils/utils';

const ShareButton = ({ title, text, url }) => {
  const [toastOpen, setToastOpen] = useState(false);

  const handleShare = async () => {
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

  return (
    <>
      <Button
        onClick={handleShare}
        variant="outlined"
        // sx={{ bgcolor: '#1976d2' }}
        // sx={{ bgcolor: 'secondary.light' }}
        sx={{
          // bgcolor: 'secondary.main',
          borderColor: 'secondary.main',
          borderRadius: '30px',
          '&:hover, &:focus, &:active': {
            borderColor: 'secondary.main',
          },

          // color: 'grey.800',
          // borderColor: 'grey.800',
          // borderRadius: '30px',
          // '&:hover, &:focus, &:active': {
          //   borderColor: 'grey.500',
          // },
        }}
      >
        <Typography variant="button2" sx={{ color: 'secondary.main' }}>
          Share
        </Typography>
        <ReplyIcon
          fontSize="medium"
          sx={{ transform: 'scaleX(-1)', ml: 0.5, color: 'secondary.main' }}
        />
      </Button>
      {/* Snackbar for toast message */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000} // Closes after 3 seconds
        onClose={() => setToastOpen(false)}
        message="Link copied to clipboard!"
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
    </>
  );
};

export default ShareButton;
