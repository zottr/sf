import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  Typography,
  Stack,
  useTheme,
  Button,
  Container,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import CollectionLinkItem from './CollectionLinkItem';
import Item from './Item';
import { GET_PRODUCTS } from '../../apollo/server';
import { gql, useLazyQuery } from '@apollo/client';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../context/ErrorContext';

const PRODUCTS = gql`
  ${GET_PRODUCTS}
`;

const HorizontalScroll = ({ collection }) => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const take = 6;
  let totalItems = 0;

  const [fetchProducts] = useLazyQuery(PRODUCTS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      if (data?.search?.items?.length < take) {
        setHasMore(false); // No more products to load
      }
      setProducts((prevProducts) => [...prevProducts, ...data?.search?.items]);
      setLoading(false);
      totalItems = data?.search?.totalItems;
    },
    onError: (err) => handleError(err),
  });

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    fetchProducts({
      variables: {
        input: {
          collectionSlug: collection.slug,
          groupByProduct: true,
          skip,
          take,
        },
      },
    });
    setSkip((prevSkip) => prevSkip + take);
  }, [fetchProducts, hasMore, loading, skip, take]);

  useEffect(() => {
    loadMoreProducts(); // Initial fetch
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  // let productItems = [
  //   ...new Set(
  //     collection.productVariants?.items.map((variant) => variant.product)
  //   ),
  // ];
  //temp code
  // let sellers = [
  //   'Taco & Bell',
  //   'Choco Kreations',
  //   'Dominos',
  //   'McDolands',
  //   'Naturals',
  // ];
  // let i = 0;
  // productItems = productItems.map((item) => {
  //   let product = {
  //     ...item,
  //     sellerName: sellers[i],
  //     sellerSlug: sellers[i].trim().replace(/\W+/g, '-').toLowerCase(),
  //   };
  //   i++;
  //   if (i === sellers.length) i = 0;
  //   return product;
  // });

  //temp
  function getSlogan() {
    let slogan = '';
    switch (collection.name) {
      case 'Plants':
        slogan = 'Browse through our selection of plants';
        break;
      case 'Furniture':
        slogan = 'High quality wooden furniture';
        break;
      case 'Electronics':
        slogan = 'Mobiles, Laptops from Top Brands';
        break;
      case 'Equipment':
        slogan = 'Browse for everyday essentials';
        break;
      case 'Computers':
        slogan = 'Buy latest models here';
        break;
      case 'Plants':
        slogan = 'Browse through our selection of plants';
        break;

      default:
        slogan = 'A generic statement about this collection';
    }
    return slogan;
  }

  return (
    <>
      <Stack spacing={1.5}>
        <Container>
          <Stack spacing={1}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  //avoid data spilling
                  wordWrap: 'break-word', // Ensures long words break and wrap onto the next line
                  whiteSpace: 'normal', // Allows the text to wrap within the container
                  width: '100%', // Ensure the text takes up the full width of its container
                  //name shouldn't extend more than 1 line
                  display: 'block',
                  maxHeight: '1.5625em', //max 1 line
                  overflow: 'hidden',
                }}
              >
                {collection.name}
              </Typography>
              <Typography
                variant="b2"
                sx={{
                  color: theme.palette.grey[700],
                  //name shouldn't extend more than 1 line
                  display: 'block',
                  maxHeight: '1.43em', //max 1 line
                  overflow: 'hidden',
                }}
              >
                {getSlogan()}
              </Typography>
            </Box>
            <Divider />
          </Stack>
        </Container>
        <Box className="horizontal-scroll">
          {products.map((product) => (
            <Item key={product.slug} item={product} />
          ))}
          <CollectionLinkItem
            name={collection.name}
            preview={collection?.featuredAsset?.preview}
            slug={collection.slug}
          />
        </Box>
        <Container>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={() => {
                navigate(`/collection/${collection.slug}`);
              }}
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                borderWidth: '0',
                backgroundColor: 'hsl(38 88.2% 98%)',
                '&:hover': {
                  backgroundColor: 'hsl(38 88.2% 98%)',
                  borderWidth: '0',
                },
                '&:focus': {
                  backgroundColor: 'hsl(38 88.2% 98%)',
                },
                '&:active': {
                  backgroundColor: 'hsl(38 88.2% 98%)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="button2"
                  sx={{ color: 'hsl(33 100% 26.7%)' }}
                >
                  View all products
                </Typography>
                <ArrowRightIcon sx={{ color: 'hsl(33 100% 36.7%)' }} />
              </Box>
            </Button>
          </Box>
        </Container>
      </Stack>
    </>
  );
};

export default HorizontalScroll;
