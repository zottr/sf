import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EastIcon from '@mui/icons-material/East';
import Slide from '@mui/material/Slide';
import SellerChatHeader from './SellerChatHeader';
import { Box, Container, Paper } from '@mui/material';
import './styles.css';

function SellerChat(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    console.log('button clicked');
  };

  const sayHello = () => {
    console.log('Hello');
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const messageTemplates = [
    'None',
    '"When will I receive my order ?"',
    '"I want to cancel my order."',
    '"I want to add more items to my order."',
    '"I want to remove some items from my order."',
    '"I want to add special instructions for my order."',
    '"I want to check availability of certain items."',
    '"I have a query regarding some items."',
  ];
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          width: '70%',
          marginY: '10px',
          fontWeight: '700',
          paddingY: '12px',
          borderRadius: '30px',
          color: 'hsl(142 70% 49%)',
          border: '1px solid',
        }}
      >
        <WhatsAppIcon fontSize="large" />
        <Typography variant="button" marginLeft="10px">
          <strong>chat with seller</strong>
        </Typography>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <SellerChatHeader handleClose={handleClose} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ marginTop: '70px' }}>
            <Typography
              sx={{
                color: 'GrayText',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '400',
                marginBottom: '20px',
                fontFamily: 'kumbh sans',
              }}
            >
              Pick a message template :
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
                overflowY: 'scroll',
              }}
            >
              {messageTemplates.map((message, index) => (
                <Button
                  onClick={sayHello}
                  sx={{
                    width: '80%',
                    borderWidth: '2px',
                    borderStyle: 'dotted',
                    borderColor: 'hsl(240, 3%, 80%)',
                    paddingY: '10px',
                    paddingX: '10px',
                    borderRadius: '50px',
                    textTransform: 'none',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && (
                      <Typography
                        sx={{
                          color: 'GrayText',
                          textAlign: 'center',
                          fontWeight: '500',
                          fontFamily: 'kumbh-sans',
                          fontSize: '20px',
                        }}
                      >
                        {message}
                      </Typography>
                    )}
                    {index !== 0 && (
                      <Typography
                        sx={{
                          color: 'GrayText',
                          textAlign: 'center',
                          fontStyle: 'italic',
                          fontFamily: 'kumbh-sans',
                          fontSize: '20px',
                        }}
                      >
                        {message}
                      </Typography>
                    )}{' '}
                  </Box>
                </Button>
              ))}
            </Box>
            <Box sx={{ height: '100px' }} />
          </Box>
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              height: '80px',
              marginBottom: '5px',
              position: 'fixed',
              bottom: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              onClick={handleClick}
              variant="outlined"
              className="seller-chat-button"
              sx={{
                padding: '15px 40px',
                marginY: '10px',
                borderRadius: '30px',
              }}
            >
              <Typography variant="button">
                <strong>Start Conversation</strong>
              </Typography>
              <EastIcon fontSize="medium" sx={{ paddingX: '10px' }} />
            </Button>
          </Paper>
        </Box>
        {/* <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseChat}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClick}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List> */}
      </Dialog>
    </React.Fragment>
  );
}

export default SellerChat;
