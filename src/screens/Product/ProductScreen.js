import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT, GET_PRODUCTS_WITH_OPTIONS } from '../../apollo/server';
import ProductImages from './ProductImages';
import useAdminInfo from '../../customhooks/useAdminInfo';
import SellerInfo from './SellerInfo';
import Item from '../../components/CollectionItemsPreview/Item';
import CallActionButtons from '../../components/shared/CallActionButtons';
import ReplaceItemsConfirmationDialog from './ReplaceItemsConfirmationDialog';
import AddToCartButton from './AddToCartButton';
import { useNavigate } from 'react-router-dom';
import DoubleCellLayoutSellerProducts from '../../components/SellerProducts/DoubleCellLayoutSellerProducts';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { handleError } from '../../context/ErrorContext';
import ShareButton from '../../components/shared/ShareButton';

const PRODUCT = gql`
  ${GET_PRODUCT}
`;

const PRODUCTS_FROM_SELLER = gql`
  ${GET_PRODUCTS_WITH_OPTIONS}
`;

function ProductScreen() {
  const navigate = useNavigate();
  const theme = useTheme();
  const query = useParams();
  const [product, setProduct] = useState();
  const [isService, setIsService] = useState(false);
  const [productVariantId, setProductVariantId] = useState();
  const [adminId, setAdminId] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);

  const { adminData } = useAdminInfo({ adminId });

  const { data, loading, error } = useQuery(PRODUCT, {
    variables: {
      slug: query.productSlug,
    },
  });

  const [fetchSellerProducts, { loading: similarProductsLoading }] =
    useLazyQuery(PRODUCTS_FROM_SELLER, { onError: (err) => handleError(err) });

  useEffect(() => {
    const product = data?.product;
    if (product) {
      setProduct(product);
      if (product.collections[0].slug === 'services') setIsService(true);
      setProductVariantId(product?.variantList?.items[0]?.id);
    }
  }, [data]);

  useEffect(() => {
    let adminIdFromProduct = product?.customFields?.adminId;
    if (adminIdFromProduct) {
      setAdminId(adminIdFromProduct);
    }
  }, [product]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchSellerProducts({
        variables: {
          options: { filter: { adminId: { eq: adminData?.id } }, take: 5 },
        },
      });
      if (response.data) {
        //display list of max 4 products by the same seller, without repeating the current product
        let allItems = response.data?.products?.items;
        let removeCurrent = allItems.filter(
          (item) => item.slug !== query.productSlug
        );
        let take4 = removeCurrent.slice(0, 4);
        setSimilarProducts(take4);
      }
    }
    if (adminData?.id) {
      fetchProducts();
    }
  }, [adminData, fetchSellerProducts]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <>{handleError(error)}</>;
  }

  if (!product) {
    return null;
  }

  return (
    <Box sx={{ overflowX: 'clip', maxWidth: '100vw' }}>
      <Container sx={{ px: 1, mb: 3 }}>
        <SellerInfo
          imageUrl={adminData?.logo}
          name={adminData?.businessName}
          id={adminData?.id}
        />
        <Stack
          direction="row"
          gap={1}
          sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
        >
          <Typography variant="h8" sx={{ color: 'grey.700' }}>
            {product.name}
          </Typography>
        </Stack>
      </Container>
      <ProductImages images={product.assets} />
      <Container sx={{ px: 1 }}>
        <Stack gap={1} sx={{ mt: 2, px: 0.5 }}>
          <Stack gap={1}>
            <Stack direction="row" gap={2} sx={{ my: 1 }}>
              {!isService && (
                <Typography variant="h5" sx={{ color: 'grey.900' }}>
                  ₹{Number(product?.variantList?.items[0]?.price ?? 0) / 100}
                </Typography>
              )}
              <ShareButton
                text={product.description}
                title={product.name}
                url={`${window.location.href.replace(/\/$/, '')}/share`}
              />
            </Stack>
            {!isService && (
              <Box sx={{ width: '100%', mt: 1 }}>
                <AddToCartButton
                  productVariantId={productVariantId}
                  adminId={product.customFields?.adminId}
                  adminName={product.customFields?.adminName}
                  buttonTextVariant="button1"
                  buttonHeight="3rem"
                  setSelectedProduct={null}
                />
              </Box>
            )}
          </Stack>
          <Typography
            variant="b1"
            color={theme.palette.grey[900]}
            sx={{
              textAlign: 'left',
              mt: 0.5,
              // '& p': {
              //   // margin: '0.2em 0',
              //   // lineHeight: 0.5,
              // },
            }}
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          >
            {/* {product.description} */}
          </Typography>
        </Stack>
        {/* Similar Products */}
        {similarProductsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <CircularProgress />
          </Box>
        ) : similarProducts.length > 1 ? (
          <Stack
            gap={2}
            sx={{ display: 'flex', alignItems: 'flex-start', mt: 2, mb: 1 }}
          >
            <Typography variant="h7" sx={{ color: theme.palette.grey[700] }}>
              Other {isService ? 'services' : 'products'} by{' '}
              {adminData?.businessName}
            </Typography>
            <DoubleCellLayoutSellerProducts products={similarProducts} />
            <Container sx={{ px: 1, mt: 2 }}>
              <Button
                onClick={() => {
                  navigate(`/seller/${adminId}`);
                }}
                variant="outlined"
                sx={{
                  width: '100%',
                  borderRadius: '25px',
                  borderColor: 'secondary.dark',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="button1"
                    sx={{ color: 'secondary.dark' }}
                  >
                    View all products
                  </Typography>
                  <ArrowRightIcon
                    fontSize="large"
                    sx={{ color: 'secondary.dark' }}
                  />
                </Box>
              </Button>
            </Container>
          </Stack>
        ) : null}
      </Container>
      {/* Replace Items Confirmation Dialog */}
      <ReplaceItemsConfirmationDialog
        productVariantId={productVariantId}
        newSellerId={adminId}
        newSellerName={product?.customFields?.adminName}
      />
    </Box>
  );
}

export default ProductScreen;
