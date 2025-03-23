import React from 'react';
import { Typography, Stack, useTheme } from '@mui/material';
import CollectionLinkItem from './CollectionLinkItem';
import Item from './Item';
import { Link } from 'react-router-dom';

const HorizontalScroll = (props) => {
  const theme = useTheme();
  let productItems = [
    ...new Set(
      props.data.productVariants.items.map((variant) => variant.product)
    ),
  ];

  //temp code
  let sellers = [
    'Taco & Bell',
    'Choco Kreations',
    'Dominos',
    'McDolands',
    'Naturals',
  ];
  let i = 0;
  productItems = productItems.map((item) => {
    let product = {
      ...item,
      sellerName: sellers[i],
      sellerSlug: sellers[i].trim().replace(/\W+/g, '-').toLowerCase(),
    };
    i++;
    if (i === sellers.length) i = 0;
    return product;
  });

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
          {props.data.name}
        </Typography>
        <Link
          to={`/collection/${props.data.slug}`}
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
            SEE ALL {'>'}
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
        {productItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
        <CollectionLinkItem
          name={props.data.name}
          preview={props.data?.featuredAsset?.preview}
          slug={props.data.slug}
        />
      </div>
    </>
  );
};

export default HorizontalScroll;
