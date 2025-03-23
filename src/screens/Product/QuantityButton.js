import { Button, Typography, Box, useTheme, Grid } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function QuantityButton({
  quantity,
  addToCart,
  removeFromCart,
  buttonHeight,
  buttonSize,
  labelVariant,
}) {
  const theme = useTheme();
  let buttonSx = { height: buttonHeight };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1.2px solid',
          borderColor: theme.palette.grey[800],
          borderRadius: '25px',
          width: '100%',
          ...buttonSx,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button onClick={removeFromCart}>
              <RemoveIcon
                sx={{ color: theme.palette.grey[800] }}
                fontSize={buttonSize}
              />
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              color={theme.palette.grey[900]}
              variant={labelVariant}
              sx={{
                textAlign: 'center',
              }}
            >
              {quantity}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button onClick={addToCart}>
              <AddIcon
                sx={{ color: theme.palette.grey[800] }}
                fontSize={buttonSize}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default QuantityButton;
