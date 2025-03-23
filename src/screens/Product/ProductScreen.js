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
import CallActionButtons from '../../components/Common/CallActionButtons';
import ReplaceItemsConfirmationDialog from './ReplaceItemsConfirmationDialog';
import AddToCartButton from './AddToCartButton';
import { useNavigate } from 'react-router-dom';
import DoubleCellLayoutProducts from '../../components/ProuctsDisplay/DoubleCellLayoutProducts';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { handleError } from '../../context/ErrorContext';
import ShareButton from '../../components/Common/ShareButton';

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
    <Container sx={{ p: 1 }}>
      <SellerInfo
        imageUrl={adminData?.logo}
        name={adminData?.businessName}
        id={adminData?.id}
      />
      <ProductImages images={product.assets} />
      <Stack gap={1} sx={{ mt: 2, px: 0.5 }}>
        <Stack>
          <Stack
            direction="row"
            gap={1}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="h5" sx={{ fontWeight: '400' }}>
              {product.name}
            </Typography>
            <ShareButton
              text={product.description}
              title={product.name}
              url={window.location.href}
            />
          </Stack>

          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            ₹{Number(product?.variantList?.items[0]?.price ?? 0) / 100}
          </Typography>
          <Box sx={{ width: '60%', mt: 1 }}>
            <AddToCartButton
              productVariantId={productVariantId}
              adminId={adminId}
              buttonTextVariant="button1"
              buttonHeight="2.7rem"
            />
          </Box>
        </Stack>
        <Typography
          variant="b1"
          color={theme.palette.grey[800]}
          sx={{ textAlign: 'left', mt: 0.5 }}
        >
          {product.description}
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
          sx={{ display: 'flex', alignItems: 'flex-start', mt: 4, mb: 1 }}
        >
          <Typography
            variant="h7"
            sx={{ fontWeight: '500', color: theme.palette.grey[800] }}
          >
            Other products by {adminData?.businessName}
          </Typography>
          <DoubleCellLayoutProducts products={similarProducts} />
          <Container sx={{ px: 1, mt: 2 }}>
            <Button
              onClick={() => {
                navigate(`/seller/${adminId}`);
              }}
              variant="outlined"
              sx={{
                width: '100%',
                borderRadius: '25px',
                borderColor: 'hsl(33 100% 26.7%)',
                backgroundColor: 'hsl(38 88.2% 99.5%)',
                '&:hover': {
                  backgroundColor: 'hsl(38 88.2% 98%)',
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
                  variant="button1"
                  sx={{ color: 'hsl(33 100% 26.7%)' }}
                >
                  View all products
                </Typography>
                <ArrowRightIcon
                  fontSize="large"
                  sx={{ color: 'hsl(33 100% 36.7%)' }}
                />
              </Box>
            </Button>
          </Container>
        </Stack>
      ) : null}

      {/* Replace Items Confirmation Dialog */}
      <ReplaceItemsConfirmationDialog
        productVariantId={productVariantId}
        adminId={adminId}
      />
    </Container>
  );
}

export default ProductScreen;
