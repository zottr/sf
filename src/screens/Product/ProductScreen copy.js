import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Stack,
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
import ReplaceItemsConfirmationDialog from './ReplaceItemsConfirmationDialog';
import AddToCartButton from './AddToCartButton';
import { useNavigate } from 'react-router-dom';

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
    useLazyQuery(PRODUCTS_FROM_SELLER);

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
          options: { filter: { adminId: { eq: adminData?.id } } },
        },
      });
      if (response.data) {
        setSimilarProducts(response.data?.products?.items);
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
          <Typography variant="h5" sx={{ fontWeight: '400' }}>
            {product.name}
          </Typography>
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
        <>
          <Divider sx={{ marginY: 3 }} />
          <Box>
            <Typography variant="h6" color={theme.palette.grey[700]}>
              Products by same seller
            </Typography>
            <div className="flex-container" id="hscroll">
              {similarProducts.map((item) => (
                <Item item={item} key={item.id} />
              ))}
            </div>
          </Box>
        </>
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
