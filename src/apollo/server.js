import { gql } from '@apollo/client';
import {
  ADDRESS_FRAGMENT,
  ASSET_FRAGMENT,
  CART_FRAGMENT,
  COUNTRY_FRAGMENT,
  ERROR_RESULT_FRAGMENT,
  ORDER_ADDRESS_FRAGMENT,
  ORDER_DETAILS,
} from './fragments';

export const REGISTER = gql`
  mutation Register($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success {
        success
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($old: String!, $new: String!) {
    updateCustomerPassword(currentPassword: $old, newPassword: $new) {
      ... on Success {
        success
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const CHANGE_EMAIL_ADDRESS = gql`
  mutation ChangeEmailAddress($password: String!, $emailAddress: String!) {
    requestUpdateCustomerEmailAddress(
      password: $password
      newEmailAddress: $emailAddress
    ) {
      ... on Success {
        success
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const UPDATE_CUSTOMER_DETAILS = gql`
  mutation UpdateCustomerDetails($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`;

export const GET_ACCOUNT_OVERVIEW = gql`
  query GetAccountOverview {
    activeCustomer {
      id
      title
      firstName
      lastName
      emailAddress
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($code: String!) {
    orderByCode(code: $code) {
      ...Cart
      shippingAddress {
        ...OrderAddress
      }
      billingAddress {
        ...OrderAddress
      }
    }
  }
  ${CART_FRAGMENT}
  ${ORDER_ADDRESS_FRAGMENT}
`;

export const GET_ORDER_LIST = gql`
  query GetOrderList($options: OrderListOptions) {
    activeCustomer {
      id
      orders(options: $options) {
        items {
          id
          updatedAt
          code
          state
          currencyCode
          total
        }
        totalItems
      }
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($input: UpdateAddressInput!) {
    updateCustomerAddress(input: $input) {
      ...Address
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const GET_ACTIVE_CHANNEL = gql`
  query GetActiveChannel {
    activeChannel {
      id
      code
      currencyCode
      defaultLanguageCode
    }
  }
`;

export const VERIFY = gql`
  mutation Verify($password: String!, $token: String!) {
    verifyCustomerAccount(password: $password, token: $token) {
      ... on CurrentUser {
        id
        identifier
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const SIGN_IN = gql`
  mutation SignIn(
    $emailAddress: String!
    $password: String!
    $rememberMe: Boolean!
  ) {
    login(
      username: $emailAddress
      password: $password
      rememberMe: $rememberMe
    ) {
      ... on CurrentUser {
        id
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ACTIVE_ORDER = gql`
  query GetActiveOrder {
    activeOrder {
      ...Cart
    }
  }
  ${CART_FRAGMENT}
`;

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createCustomerAddress(input: $input) {
      ...Address
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      description
      variantList(options: {}) {
        items {
          id
          price
        }
      }
      featuredAsset {
        ...Asset
      }
      assets {
        ...Asset
      }
      collections {
        id
        slug
      }
      customFields {
        adminId
        adminName
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_PRODUCT_DETAIL_OLD = gql`
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
      id
      name
      description
      variants {
        id
        name
        options {
          code
          name
        }
        price
        priceWithTax
        sku
      }
      featuredAsset {
        ...Asset
      }
      assets {
        ...Asset
      }
      collections {
        id
        slug
        breadcrumbs {
          id
          name
          slug
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: ID!, $qty: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $qty) {
      ...Cart
      ...ErrorResult
      ... on InsufficientStockError {
        order {
          ...Cart
        }
      }
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        slug
        productName
        description
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
        }
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
      }
      totalItems
      facetValues {
        count
        facetValue {
          id
          name
          facet {
            id
            name
          }
        }
      }
    }
  }
`;

export const SEARCH_SUGGESTIONS = gql`
  query SearchSuggestions($input: SearchInput!) {
    search(input: $input) {
      items {
        slug
        productName
        productAsset {
          preview
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        slug
        productName
        description
        productAsset {
          preview
        }
        price {
          ... on PriceRange {
            min
            max
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_OLD = gql`
  query GetCollection($id: ID, $slug: String) {
    collection(id: $id, slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        ...Asset
      }
      breadcrumbs {
        id
        slug
        name
      }
      children {
        id
        slug
        featuredAsset {
          ...Asset
        }
        name
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const ADJUST_ITEM_QUANTITY = gql`
  mutation AdjustItemQuantity($id: ID!, $qty: Int!) {
    adjustOrderLine(orderLineId: $id, quantity: $qty) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($id: ID!) {
    removeOrderLine(orderLineId: $id) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const EMPTY_CART = gql`
  mutation EmptyCart {
    removeAllOrderLines {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_CART_TOTALS = gql`
  query GetCartTotals {
    activeOrder {
      id
      active
      totalQuantity
      totalWithTax
    }
  }
`;

export const GET_ORDER_FOR_CHECKOUT = gql`
  query GetOrderForCheckout {
    activeOrder {
      ...Cart
      shippingAddress {
        ...OrderAddress
      }
    }
  }
  ${CART_FRAGMENT}
  ${ORDER_ADDRESS_FRAGMENT}
`;

export const GET_CUSTOMER_ADDRESSES = gql`
  query GetCustomerAddresses {
    activeCustomer {
      id
      addresses {
        ...Address
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const GET_AVAILABLE_COUNTRIES = gql`
  query GetAvailableCountries {
    availableCountries {
      ...Country
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const GET_ACTIVE_CUSTOMER = gql`
  query GetActiveCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`;
export const GET_COLLECTIONS_INFO_OLD = gql`
  query GetCollections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        featuredAsset {
          ...Asset
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_ELIGIBLE_PAYMENT_METHODS = gql`
  query GetEligiblePaymentMethods {
    eligiblePaymentMethods {
      id
      code
      eligibilityMessage
      isEligible
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation AddPayment($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_NEXT_ORDER_STATES = gql`
  query GetNextOrderStates {
    nextOrderStates
  }
`;

export const TRANSITION_TO_ADDING_ITEMS = gql`
  mutation TransitionToAddingItems {
    transitionOrderToState(state: "AddingItems") {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ORDER_SHIPPING_DATA = gql`
  query GetOrderShippingData {
    activeOrder {
      id
      customer {
        id
        firstName
        lastName
        emailAddress
      }
      shippingAddress {
        ...OrderAddress
      }
    }
  }
  ${ORDER_ADDRESS_FRAGMENT}
`;

export const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
      ...Cart
      ... on Order {
        shippingAddress {
          ...OrderAddress
        }
      }
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ORDER_ADDRESS_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ELIGIBLE_SHIPPING_METHODS = gql`
  query GetEligibleShippingMethods {
    eligibleShippingMethods {
      id
      name
      description
      price
      priceWithTax
      metadata
    }
  }
`;

export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($id: [ID!]!) {
    setOrderShippingMethod(shippingMethodId: $id) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const SET_CUSTOMER_FOR_ORDER = gql`
  mutation SetCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ... on Order {
        id
        customer {
          id
          emailAddress
          firstName
          lastName
        }
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const SET_ORDER_CUSTOM_FIELDS = gql`
  mutation setOrderCustomFields($input: UpdateOrderInput!) {
    setOrderCustomFields(input: $input) {
      ... on Order {
        id
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const TRANSITION_TO_ARRANGING_PAYMENT = gql`
  mutation TransitionToArrangingPayment {
    transitionOrderToState(state: "ArrangingPayment") {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_ORDER_BY_CODE = gql`
  query GetOrderByCode($code: String!) {
    orderByCode(code: $code) {
      ...OrderDetails
      updatedAt
      createdAt
      customer {
        id
        emailAddress
        phoneNumber
        firstName
        lastName
        user {
          id
          identifier
          verified
        }
      }
    }
  }
  ${ORDER_DETAILS}
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    logout {
      success
    }
  }
`;

export const VERIFY_CHANGE_EMAIL_ADDRESS = gql`
  mutation VerifyChangeEmailAddress($token: String!) {
    updateCustomerEmailAddress(token: $token) {
      ... on Success {
        success
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
      ... on Success {
        success
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;

export const GET_COLLECTIONS = gql`
  query getCollections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        featuredAsset {
          id
          preview
        }
        customFields {
          banner {
            ...Asset
          }
          summary
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_COLLECTIONS_WITH_PRODUCTS = gql`
  query getCollections($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        featuredAsset {
          id
          preview
        }
        productVariants(options: { take: 5 }) {
          items {
            product {
              id
              name
              slug
              featuredAsset {
                id
                preview
              }
              variants {
                price
              }
            }
          }
        }
        customFields {
          banner {
            ...Asset
          }
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_COLLECTION_PRODUCTS = gql`
  query collection($slug: String, $options: ProductVariantListOptions) {
    collection(slug: $slug) {
      id
      productVariants(options: $options) {
        items {
          product {
            id
            name
            slug
            description
            featuredAsset {
              id
              preview
            }
            variants {
              id
              price
            }
            customFields {
              adminId
              adminName
            }
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS_WITH_PRODUCTS_OLD = gql`
  query GetCollectionsWithProducts($options: CollectionListOptions) {
    collections(options: $options) {
      items {
        id
        name
        slug
        featuredAsset {
          ...Asset
        }
        productVariants(options: { take: 10 }) {
          items {
            id
            name
            price
            product {
              description
              assets {
                ...Asset
              }
            }
          }
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_PRODUCT_NAMES = gql`
  query GetProductNames {
    products {
      items {
        key: name
        value: name
      }
    }
  }
`;

export const getConfiguration = `query Configuration{
  configuration{
    _id
    currency
    currencySymbol
    deliveryRate
    twilioEnabled
    webClientID
    googleApiKey
    webAmplitudeApiKey
    googleMapLibraries
    googleColor
    webSentryUrl
    publishableKey
    clientId
    skipEmailVerification
    skipMobileVerification
  }
}`;

export const GET_PRODUCTS_WITH_OPTIONS = gql`
  query getProductsWithOptions($options: ProductListOptions) {
    products(options: $options) {
      items {
        id
        name
        slug
        featuredAsset {
          id
          preview
          source
        }
        variants {
          id
          price
        }
        customFields {
          adminId
          adminName
        }
      }
    }
  }
`;
export const GET_ALL_COLLECTIONS = `
  query GetAllCollections {
    collections {
      items {
        id
        slug
        name
        parentId
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`;

export const GET_PLACE_ORDER_METADATA = gql`
  query getPlaceOrderMetadata {
    eligibleShippingMethods {
      id
      name
      description
      price
      priceWithTax
      metadata
    }
    eligiblePaymentMethods {
      id
      code
      eligibilityMessage
      isEligible
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder(
    $updateOrderInput: UpdateOrderInput!
    $customerInput: CreateCustomerInput!
    $addressInput: CreateAddressInput!
    $shippingMethodId: [ID!]!
    $paymentInput: PaymentInput!
  ) {
    setOrderCustomFields(input: $updateOrderInput) {
      ... on Order {
        id
      }
      ...ErrorResult
    }
    setCustomerForOrder(input: $customerInput) {
      ... on Order {
        id
        customer {
          id
          emailAddress
          firstName
          lastName
        }
      }
      ...ErrorResult
    }
    setOrderShippingAddress(input: $addressInput) {
      ...Cart
      ... on Order {
        shippingAddress {
          ...OrderAddress
        }
      }
      ...ErrorResult
    }
    setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
      ...Cart
      ...ErrorResult
    }
    transitionOrderToState(state: "ArrangingPayment") {
      ...Cart
      ...ErrorResult
    }
    addPaymentToOrder(input: $paymentInput) {
      ...Cart
      ...ErrorResult
    }
  }
  ${CART_FRAGMENT}
  ${ASSET_FRAGMENT}
  ${ORDER_ADDRESS_FRAGMENT}
  ${ERROR_RESULT_FRAGMENT}
`;
