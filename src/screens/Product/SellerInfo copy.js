import React from 'react';
import { Box, Grid, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StarButton from '../SellerDetails/FavButton';

function SellerInfo({ imageUrl, name, id }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 2,
        paddingBottom: 2,
      }}
    >
      <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar alt={name} src={imageUrl} sx={{ width: 30, height: 30 }} />
          </Grid>
          <Grid item>
            <Typography variant="b1">{name ?? 'Sample Name'}</Typography>
          </Grid>
          <Grid item>
            <StarButton sellerId={id} />
          </Grid>
        </Grid>
        <Grid item container>
          <Link to={`/seller/${id}`}>
            <Typography variant="label1">Visit Store</Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SellerInfo;
