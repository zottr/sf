import {
  Avatar,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import logo from '/logos/zottr_logo_small2_white_grey.svg';
import { Link } from 'react-router-dom';

function ServiceItemPreview({ item, index, totalItems }) {
  const theme = useTheme();

  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  const strippedDescription = stripHtml(item.product.description);

  return (
    <>
      <Link
        to={
          item.product.customFields.itemType === 'service'
            ? `/service/${item.product.slug}`
            : `/product/${item.product.slug}`
        }
        style={{ textDecoration: 'none' }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={4} className="flexCenter">
            <Avatar
              alt={item.product.name}
              src={`${item.product.featuredAsset?.preview}?preset=thumb`}
              variant="rounded"
              sx={{
                width: '5rem',
                height: '5rem',
                aspectRatio: 1,
                bgcolor: 'grey.300',
              }}
            >
              <img src={logo} alt="Logo" style={{ height: '70%' }} />
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Stack gap={1}>
              <Stack>
                {' '}
                <Typography variant="heavyb1" sx={{ color: 'grey.900' }}>
                  {item.product.name}
                </Typography>
                <Typography variant="heavyb2" sx={{ color: 'grey.600' }}>
                  {item.product?.customFields?.adminName}
                </Typography>
              </Stack>
              <Typography
                variant="b2"
                sx={{ color: 'grey.800', fontStyle: 'italic' }}
              >
                {strippedDescription.length > 75
                  ? `${strippedDescription.substring(0, 75)}`
                  : strippedDescription}
                {strippedDescription.length > 75 && (
                  <span style={{ color: 'black', fontSize: '15px' }}>...</span>
                )}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Link>
      {index !== totalItems - 1 && (
        <Divider flexItem variant="fullWidth" sx={{ mt: 0.5, mb: 0.5 }} />
      )}
    </>
  );
}

export default ServiceItemPreview;
