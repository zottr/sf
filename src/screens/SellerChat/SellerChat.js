import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EastIcon from '@mui/icons-material/East';
import { Box, useTheme } from '@mui/material';

function SellerChat() {
  const theme = useTheme();

  const handleClick = () => {
    console.log('button clicked');
  };

  const sayHello = () => {
    console.log('Hello');
  };

  const messageTemplates = [
    'None',
    '"When will I receive my order?"',
    '"I want to cancel my order."',
    '"I want to add more items to my order."',
    '"I want to remove some items from my order."',
    '"I want to add special instructions for my order."',
    '"I want to check availability of certain items."',
    '"I have a query regarding some items."',
  ];
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography
            sx={{
              color: theme.palette.grey[800],
              textAlign: 'center',
              marginBottom: '20px',
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
                      variant="b1"
                      sx={{
                        color: theme.palette.grey[600],
                        textAlign: 'center',
                      }}
                    >
                      <i>{message}</i>
                    </Typography>
                  )}
                  {index !== 0 && (
                    <Typography
                      variant="b1"
                      sx={{
                        color: theme.palette.grey[600],
                        textAlign: 'center',
                      }}
                    >
                      <i>{message}</i>
                    </Typography>
                  )}{' '}
                </Box>
              </Button>
            ))}
          </Box>
          <Box sx={{ height: '100px' }} />
        </Box>
        <Box
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
            variant="contained"
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
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default SellerChat;
