import { gql } from '@apollo/client';

export const ASSET_FRAGMENT = gql`
  fragment Asset on Asset {
    id
    width
    height
    name
    preview
    focalPoint {
      x
      y
    }
  }
`;

export const CART_FRAGMENT = gql`
  fragment Cart on Order {
    id
    code
    state
    active
    updatedAt
    orderPlacedAt
    lines {
      id
      featuredAsset {
        ...Asset
      }
      unitPrice
      unitPriceWithTax
      quantity
      linePriceWithTax
      discountedLinePriceWithTax
      productVariant {
        id
        name
        product {
          slug
          customFields {
            adminId
            adminName
            itemType
          }
        }
      }
      discounts {
        amount
        amountWithTax
        description
        adjustmentSource
        type
      }
    }
    totalQuantity
    subTotal
    subTotalWithTax
    total
    totalWithTax
    shipping
    shippingWithTax
    shippingLines {
      priceWithTax
      shippingMethod {
        id
        code
        name
        description
      }
    }
    discounts {
      amount
      amountWithTax
      description
      adjustmentSource
      type
    }
  }
  ${ASSET_FRAGMENT}
`;

export const ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    id
    code
    state
    active
    updatedAt
    orderPlacedAt
    lines {
      id
      featuredAsset {
        ...Asset
      }
      unitPrice
      unitPriceWithTax
      quantity
      linePriceWithTax
      discountedLinePriceWithTax
      productVariant {
        id
        name
        product {
          id
          customFields {
            adminId
            adminName
            itemType
          }
        }
      }
      discounts {
        amount
        amountWithTax
        description
        adjustmentSource
        type
      }
    }
    shippingAddress {
      streetLine1
      countryCode
    }
    totalQuantity
    subTotal
    subTotalWithTax
    total
    totalWithTax
    shipping
    shippingWithTax
    shippingLines {
      priceWithTax
      shippingMethod {
        id
        code
        name
        description
      }
    }
    discounts {
      amount
      amountWithTax
      description
      adjustmentSource
      type
    }
  }
  ${ASSET_FRAGMENT}
`;

export const COUNTRY_FRAGMENT = gql`
  fragment Country on Country {
    id
    code
    name
    enabled
  }
`;

export const ORDER_ADDRESS_FRAGMENT = gql`
  fragment OrderAddress on OrderAddress {
    fullName
    company
    streetLine1
    streetLine2
    city
    province
    postalCode
    country
    phoneNumber
  }
`;

export const ADDRESS_FRAGMENT = gql`
  fragment Address on Address {
    id
    fullName
    company
    streetLine1
    streetLine2
    city
    province
    postalCode
    country {
      id
      code
      name
    }
    phoneNumber
    defaultShippingAddress
    defaultBillingAddress
  }
`;

export const ERROR_RESULT_FRAGMENT = gql`
  fragment ErrorResult on ErrorResult {
    errorCode
    message
  }
`;
