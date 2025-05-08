import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ServiceItemPreview from './ServiceItemPreview';

function ServicesCollectionLayout({ products }) {
  const theme = useTheme();

  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  return (
    <>
      <Container>
        <Stack gap={1}>
          {products.map((item, index) => (
            <ServiceItemPreview
              item={item}
              index={index}
              totalItems={products.length}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default ServicesCollectionLayout;
