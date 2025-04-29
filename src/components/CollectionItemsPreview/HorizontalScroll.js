import React from 'react';
import {
  Typography,
  Stack,
  useTheme,
  Button,
  Container,
  Box,
  Divider,
  useMediaQuery,
} from '@mui/material';
import CollectionLinkItem from './CollectionLinkItem';
import Item from './Item';
import { GET_COLLECTION_PRODUCTS } from '../../apollo/server';
import { gql, useQuery } from '@apollo/client';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { handleError } from '../../context/ErrorContext';
import ItemsSkeleton from './ItemsSkeleton';
import ServicesBanner from '../StoreBanner/ServicesBanner';

const PRODUCTS = gql`
  ${GET_COLLECTION_PRODUCTS}
`;

const HorizontalScroll = ({ collection }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const take = 6;

  const { data, loading } = useQuery(PRODUCTS, {
    variables: {
      slug: collection.slug,
      options: { skip: 0, take, sort: { updatedAt: 'DESC' } },
    },
    onError: (err) => handleError(err),
  });

  const items = data?.collection.productVariants?.items ?? [];

  return (
    <Stack spacing={1.5}>
      <Container>
        <Stack
          spacing={1}
          component={RouterLink}
          to={`/collection/${collection.slug}`}
          sx={{ textDecoration: 'none' }}
        >
          <Box>
            <Typography
              variant={isDesktop ? 'h4' : 'h6'}
              sx={{
                textDecoration: 'none',
                color: 'grey.900',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                width: '100%',
                display: 'block',
                maxHeight: '1.5625em',
                overflow: 'hidden',
              }}
            >
              {collection.name}
            </Typography>
            <Typography
              variant="b1"
              sx={{
                color: theme.palette.grey[700],
                display: 'block',
                maxHeight: '1.43em',
                overflow: 'hidden',
              }}
            >
              {collection.customFields.summary}
            </Typography>
          </Box>
          {collection.slug !== 'services' && <Divider />}
        </Stack>
      </Container>
      {collection.slug === 'services' && <ServicesBanner />}
      {loading && <ItemsSkeleton />}
      {!loading && (
        <Box className="horizontal-scroll">
          {items.map((product) => (
            <Item key={product.product.slug} item={product.product} />
          ))}
          <CollectionLinkItem
            name={collection.name}
            preview={`${collection?.featuredAsset?.preview}?preset=${
              isDesktop ? 'medium' : 'thumb'
            }`}
            slug={collection.slug}
          />
        </Box>
      )}

      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => navigate(`/collection/${collection.slug}`)}
            variant="outlined"
            size="large"
            sx={{
              mt: 2,
              borderRadius: '25px',
              borderColor: 'secondary.dark',
              '&:hover, &:focus, &:active': {
                // bgcolor: 'primary.light',
                borderColor: 'secondary.dark',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="button1" sx={{ color: 'secondary.dark' }}>
                {collection.slug === 'services'
                  ? 'View all services'
                  : 'View all products'}
              </Typography>
              <ArrowRightIcon sx={{ color: 'secondary.dark' }} />
            </Box>
          </Button>
        </Box>
      </Container>
    </Stack>
  );
};

export default HorizontalScroll;
