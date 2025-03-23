import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

function StoreTitleBox() {
  const theme = useTheme();
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0.5rem',
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: theme.palette.common.white }}
          align="center"
        >
          Urbana <br /> Market
        </Typography>
      </Box>
    </Container>
  );
}

export default StoreTitleBox;
