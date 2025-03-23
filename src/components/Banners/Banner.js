import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';

export default function Banner(props) {
  var textAlign;
  switch (props.align) {
    case 'left':
      textAlign = 'flex-start';
      break;
    case 'right':
      textAlign = 'flex-end';
      break;
    case 'center':
      textAlign = 'center';
      break;
    default:
      textAlign = 'center';
      break;
  }

  const textColor = props.color === 'dark' ? 'black' : 'white';
  const textStyle = { alignItems: textAlign };

  return (
    <Box sx={{ display: 'flex' }} marginTop={2} marginX={2}>
      <Paper
        elevation={5}
        sx={{
          borderRadius: '15px',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '7rem',
        }}
      >
        <Box
          component="img"
          sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
          src={props.image}
        />
        <Box
          sx={{
            ...textStyle,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '8%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            fontWeight="bolder"
            color={textColor}
            paddingRight="10px"
            paddingLeft="10px"
            variant="h6"
          >
            {props.title}
          </Typography>
          <Typography color={textColor} paddingRight="10px" paddingLeft="10px">
            {props.description}
          </Typography>
          <Paper
            elevation={16}
            sx={{
              borderRadius: '14px',
              marginTop: '0.5rem',
              width: '6rem',
              borderStyle: 'solid',
              borderWidth: '1',
              backgroundColor: 'white',
              marginRight: '10px',
              marginLeft: '10px',
            }}
          >
            <Typography
              color="black"
              variant="button"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '0px 5px 0px 5px',
              }}
            >
              SHOP NOW
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
}
