import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Typography, Stack, useTheme, Button, Container } from '@mui/material';
import CollectionLinkItem from './CollectionLinkItem';
import Item from './Item';
import { Link } from 'react-router-dom';
import { GET_PRODUCTS } from '../../apollo/server';
import { gql, useLazyQuery } from '@apollo/client';
import CollectionsContext from '../../context/CollectionsContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PRODUCTS = gql`
  ${GET_PRODUCTS}
`;

const HorizontalScroll = ({ collection }) => {
  const { collections, loading: collectionLoading } =
    useContext(CollectionsContext);
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
  });

  const loadMoreProducts = useCallback(() => {
    console.log('load more called');
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

  return (
    <>
      <Stack
        alignItems="center"
        direction="row"
        gap={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          height: '50px',
        }}
      >
        <Typography
          style={{ paddingLeft: '20px', paddingTop: '20px ' }}
          variant="h6"
        >
          {collection.name}
        </Typography>
        <Link
          to={`/collection/${collection.slug}`}
          style={{ textDecoration: 'none', paddingTop: '20px' }}
        >
          <Typography
            sx={{
              paddingLeft: '20px',
              paddingTop: '30px',
              paddingRight: '20px',
              color: theme.palette.secondary.dark,
            }}
            variant="label2"
          >
            view all {'>'}
          </Typography>
        </Link>
      </Stack>
      <hr
        sx={{
          backgroundColor: theme.palette.common.black,
          marginLeft: '20px',
          marginRight: '20px',
        }}
      />
      <div className="flex-container" id={`hscroll`}>
        {products.map((product) => (
          <Item item={product} />
        ))}
        <CollectionLinkItem
          name={collection.name}
          preview={collection?.featuredAsset?.preview}
          slug={collection.slug}
        />
      </div>
    </>
  );
};

export default HorizontalScroll;
