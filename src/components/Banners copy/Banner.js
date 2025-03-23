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
    <Box>
      <Paper
        elevation={5}
        sx={{
          width: '400px',
          height: '200px',
          marginLeft: '30%',
          marginTop: '10%',
          borderRadius: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          sx={{
            height: '100%',
            width: '100%',
          }}
          src={props.image}
        />
        <Box
          sx={{
            ...textStyle,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            fontFamily="Poppins"
            fontWeight="bolder"
            fontSize="2rem"
            color={textColor}
            paddingRight="10px"
            paddingLeft="10px"
          >
            {props.title}
          </Typography>
          <Typography
            fontSize="1rem"
            color={textColor}
            fontFamily="Poppins"
            paddingRight="10px"
            paddingLeft="10px"
          >
            {props.description}
          </Typography>
          <Paper
            elevation={16}
            sx={{
              borderRadius: '16px',
              marginTop: '0.5rem',
              width: '6.5rem',
              borderStyle: 'solid',
              borderWidth: '1px',
              backgroundColor: 'white',
              marginRight: '10px',
              marginLeft: '10px',
            }}
          >
            <Typography
              color="black"
              fontFamily="Poppins"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1em',
                padding: '0px 5px 0px 5px',
              }}
            >
              SHOP NOW
            </Typography>
          </Paper>
        </Box>
      </Paper>{' '}
    </Box>
  );
}
