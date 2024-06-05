import { PRODUCT_LIST_ITEM_FRAGMENT } from "./productDetails";

export const PRODUCT_LIST = ({ channel, first }) => {
  return JSON.stringify({
    query: `
    query ProductListPaginated($first: Int!, $after: String, $channel: String!) {
      products(
        first: $first
        after: $after
        channel: $channel
        filter: {isPublished: true}
        sortBy: {direction: DESC, field: CREATED_AT}
      ) {
        totalCount
        edges {
          node {
            ...ProductListItem
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
    
      ${PRODUCT_LIST_ITEM_FRAGMENT}
    `,
    variables: { channel, first },
  });
};

export const ORDER_LIST = ({ orderId }) => {
  return JSON.stringify({
    query: `
    query getOrderDetails($orderId: ID!) {
      order(id: $orderId) {
        id
        billingAddress {
          firstName
          lastName
          streetAddress1
          city
          country {
            code
            country
          }
          postalCode
          phone
        }
        shippingAddress {
          firstName
          lastName
          streetAddress1
          city
          country {
            code
            country
          }
          postalCode
          phone
        }
        courierPartner {
          name
          trackingUrl
          id
        }
        lines {
          id
          productName
          productSku
          taxRate
          totalPrice {
            gross {
              amount
              currency
            }
          }
          quantity
        }
        events {
          message
          id
          date
          type
        }
        number
        statusDisplay
        subtotal {
          gross {
            amount
            currency
          }
        }
        total {
          gross {
            amount
            currency
          }
        }
        shippingMethods {
          id
          price {
            amount
            currency
          }
        }
        isPaid
        paymentStatus
        created
      }
    }
    `,
    variables: { orderId },
  });
};

export const MY_ORDER_LIST = ({ first }) => {
  return JSON.stringify({
    query: `
    query Myorders($first:Int!) {
      me {
        email
        orders(first: $first) {
          edges {
            node {
              id
              number
              status
              total {
                gross {
                  amount
                  currency
                }
              }
              lines {
                productName
                quantity
                totalPrice {
                  gross {
                    amount
                    currency
                  }
                }
              }
              created
            }
          }
        }
      }
    }
    `,
    variables: { first },
  });
};

export const ADD_WISHLIST = ({ input }) => {
  return JSON.stringify({
    query: `
    mutation CreateWishList($input: WishListCreateInput!) {
      createWishlistItem(input: $input) {
        wishlistItem {
          variant
          id
        }
      }
    }
    `,
    variables: { input },
  });
};

export const WISHLIST_LIST = ({ userEmail }) => {
  return JSON.stringify({
    query: `
    query GetWishListQuery($userEmail: String!) {
      wishlists(first: 100, filter: {user: $userEmail}) {
        edges {
          node {
            user {
              firstName
              email
            }
            variant
            product {
              name
              slug
              variants {
                id
                name
              }
              images {
                url
                alt
              }
              defaultVariant {
                id
                name
              }
              media {
                url
              }
              defaultChannelPricing
              indiaChannelPricing
            }
          }
        }
      }
    }
    `,
    variables: { userEmail },
  });
};

export const GET_PRODUCTLIST_BY_ID = ({ ids, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($ids: [ID!]!, $channel: String!) {
      products(filter: {ids: $ids}, channel: $channel, first: 10) {
        edges {
          node {
            id
            images {
              url
              alt
            }
            name
            description
            variants {
              id
              sku
            }
            thumbnail {
              url
              alt
            }
            category {
              id
              name
            }
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                  }
                }
                stop {
                  gross {
                    amount
                  }
                }
              }
            }
            defaultVariant {
              id
              costPrice
              name
              quantityAvailable
            }
          }
        }
      }
    }
    `,
    variables: { ids, channel },
  });
};

export const CATEGORY_LIST = ({ channel, first }) => {
  return JSON.stringify({
    query: `
    query CategoryList($first: Int!,$after: String, $channel: String!) {
      categories(first: $first, after: $after) {
        edges {
          node {
            id
            name
            description
            products(channel: $channel) {
              totalCount
            }
          }
        }
      }
    }
    `,
    variables: { channel, first },
  });
};

export const PARENT_CATEGORY_LIST = ({ channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($channel: String!) {
      categories(first: 100, level: 0) {
        edges {
          node {
            id
            name
            slug
            products(channel: $channel) {
              totalCount
            }
          }
        }
      }
    }
    `,
    variables: { channel },
  });
};

export const PRODUCT_FILTER = ({ channel, first, after, filter }) => {
  return JSON.stringify({
    query: `
    query FilterProducts($channel: String!, $first: Int!, $after: String, $filter: ProductFilterInput!) {
      products(filter: $filter, channel: $channel, first: $first, after: $after) {
        edges {
          node {
            id
            name
            slug
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                    currency
                  }
                }
                stop {
                  gross {
                    amount
                    currency
                  }
                }
              }
            }
            category {
              id
              name
              description
            }
            thumbnail(size: 1024, format: WEBP) {
              url
              alt
            }
            created
            images {
              url
            }
            variants {
              id
            }
            description
            metadata {
              key
              value
            }
          }
        }
      }
    }
    `,
    variables: { channel, first, after, filter },
  });
};

export const FINISH_LIST = () => {
  return JSON.stringify({
    query: `
    query GetProductFinished {
      productFinishes(first: 100) {
        edges {
          node {
            name
            slug
            id
          }
        }
        totalCount
      }
    }
    `,
  });
};

export const STONE_LIST = () => {
  return JSON.stringify({
    query: `
    query MyQuery {
      productStoneTypes(first: 100) {
          edges {
              node {
                  id
                  name
                  slug
              }
          }
      }
  }
    `,
  });
};

export const STYLE_LIST = () => {
  return JSON.stringify({
    query: `
    query GetProductStyles {
      productStyles(first: 100) {
          edges {
              node {
                  id
                  name
                  slug
              }
          }
          totalCount
      }
  }
    `,
  });
};

export const DESIGN_LIST = () => {
  return JSON.stringify({
    query: `
    query MyQuery {
      productDesigns(first: 100) {
          totalCount
          edges {
              node {
                  id
                  name
                  slug
              }
          }
      }
  }
    `,
  });
};

export const UPDATE_EMAIL = ({ checkoutId, email }) => {
  return JSON.stringify({
    query: `
    mutation checkoutEmailUpdate($email: String!, $checkoutId: ID!) {
      checkoutEmailUpdate(email: $email, id: $checkoutId) {
        errors {
          ...CheckoutErrorFragment
          __typename
        }
      
        __typename
      }
    }
    fragment CheckoutErrorFragment on CheckoutError {
      message
      field
      code
      __typename
    }
    `,
    variables: { checkoutId, email },
  });
};

export const PAYMENT_SUCCESS = ({
  id,
  name,
  message,
  pspReference,
  amountAuthorized,
  amountCharged,
  externalUrl,
  currency,
}) => {
  return JSON.stringify({
    query: `
    mutation ($id: ID!, $name: String!, $message: String!, $pspReference: String!, $currency: String!, $amountAuthorized: PositiveDecimal!, $amountCharged: PositiveDecimal!, $externalUrl: String!) {
      transactionCreate(
        id: $id
        transaction: {
          name: $name
          message: $message
          pspReference: $pspReference
          availableActions: [REFUND]
          amountAuthorized: { currency: $currency, amount: $amountAuthorized }
          amountCharged: { currency: $currency, amount: $amountCharged }
          externalUrl: $externalUrl
        }
      ) {
        transaction {
          id
        }
      }
    }
    `,
    variables: {
      id,
      name,
      message,
      pspReference,
      amountAuthorized,
      amountCharged,
      externalUrl,
      currency,
    },
  });
};

export const FEATURE_PRODUCT = ({ first, after, channel, collectionid }) => {
  return JSON.stringify({
    query: `
    query ProductListPaginated($first: Int!, $after: String, $channel: String!, $collectionid: [ID!]!) {
      collections(first: $first, channel: $channel, filter: {ids: $collectionid}) {
        edges {
          node {
            id
            name
            products(first: $first, after: $after) {
              totalCount
              edges {
                node {
                  ...ProductListItem
                  id
                  name
                  metadata {
                    key
                    value
                  }
                }
                cursor
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
        }
      }
    }
    
    fragment ProductListItem on Product {
      id
      name
      slug
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
          stop {
            gross {
              amount
              currency
            }
          }
        }
      }
      category {
        id
        name
        slug
      }
      thumbnail(size: 1024, format: WEBP) {
        url
        alt
      }
      variants {
        id
        name
        sku
        quantityAvailable
      }
      media {
        id
        url
        alt
      }
      defaultVariant {
        id
        quantityAvailable
        costPrice
      }
    }
    
    `,
    variables: { first, after, channel, collectionid },
  });
};

export const COUNTRY_LIST = () => {
  return JSON.stringify({
    query: `
    query CountryList {
      shop {
        countries {
          code
          country
        }
      }
    }
    `,
  });
};

export const STATE_LIST = ({ code }) => {
  return JSON.stringify({
    query: `
    query CountryArea($code: CountryCode!) {
      addressValidationRules(countryCode: $code) {
        countryAreaChoices {
          raw
          verbose
        }
      }
    }
    `,
    variables: { code },
  });
};

export const PRE_ORDER_LIST = ({ first, after, channel, collectionid }) => {
  return JSON.stringify({
    query: `
    query ProductListPaginated($first: Int!, $after: String, $channel: String!, $collectionid: [ID!]!) {
      collections(first: $first, channel: $channel, filter: {ids: $collectionid}) {
        edges {
          node {
            id
            name
            products(first: $first, after: $after) {
              totalCount
              edges {
                node {
                  ...ProductListItem
                  id
                  name
                  images {
                    url
                    id
                    alt
                  }
                }
                cursor
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
        }
      }
    }
    
    fragment ProductListItem on Product {
      id
      name
      slug
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
          stop {
            gross {
              amount
              currency
            }
          }
        }
      }
      category {
        id
        name
        slug
      }
      thumbnail(size: 1024, format: WEBP) {
        url
        alt
      }
      description
      defaultVariant {
        id
        quantityAvailable
      }
      media {
        id
        url
        alt
      }
      defaultVariant {
        id
        quantityAvailable
      }
    }
    
    `,
    variables: { first, after, channel, collectionid },
  });
};

export const SALE_LIST = ({ code }) => {
  return JSON.stringify({
    query: `
    query CollectionDetails($id: ID!, $first: Int, $after: String, $last: Int, $before: String) {
      collection(id: $id) {
        ...CollectionDetails
        products(first: $first, after: $after, before: $before, last: $last) {
          edges {
            node {
              ...CollectionProduct
              __typename
            }
            __typename
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
            __typename
          }
          __typename
        }
        __typename
      }
    }
    
    fragment CollectionDetails on Collection {
      ...Collection
      ...Metadata
      backgroundImage {
        alt
        url
        __typename
      }
      slug
      description
      seoDescription
      seoTitle
      __typename
    }
    
    fragment Collection on Collection {
      id
      name
      channelListings {
        isPublished
        publicationDate
        channel {
          id
          name
          __typename
        }
        __typename
      }
      __typename
    }
    
    fragment Metadata on ObjectWithMetadata {
      metadata {
        ...MetadataItem
        __typename
      }
      privateMetadata {
        ...MetadataItem
        __typename
      }
      __typename
    }
    
    fragment MetadataItem on MetadataItem {
      key
      value
      __typename
    }
    
    fragment CollectionProduct on Product {
      id
      name
      productType {
        id
        name
        __typename
      }
      thumbnail {
        url
        __typename
      }
      channelListings {
        ...ChannelListingProductWithoutPricing
        __typename
      }
      __typename
    }
    
    fragment ChannelListingProductWithoutPricing on ProductChannelListing {
      isPublished
      publicationDate
      isAvailableForPurchase
      availableForPurchase
      visibleInListings
      channel {
        id
        name
        currencyCode
        __typename
      }
      __typename
    }
    
    `,
    variables: { code },
  });
};

export const PRODUCT_SEARCH = ({ query, channel }) => {
  return JSON.stringify({
    query: `query ProductSearchbyName($query: String!, $channel: String!) {
      products(
        first: 50
        channel: $channel
        search: $query
        sortBy: {direction: ASC, field: NAME}
      ) {
        edges {
          node {
            id
            name
            defaultVariant {
              id
              name
              
            }
            thumbnail {
              url
            }
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                  }
                }
                stop {
                  gross {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    variables: { query, channel },
  });
};

export const PRODUCT_20_PERCENTAGE = ({
  channel,
  first,
  after,
  collectionid,
}) => {
  return JSON.stringify({
    query: `
    query Product20percentageDiscount($first: Int!, $after: String, $channel: String!, $collectionid: [ID!]!) {
      collections(first: $first, channel: $channel, filter: {ids: $collectionid}) {
        edges {
          node {
            id
            name
            products(first: $first, after: $after) {
              totalCount
              edges {
                node {
                  ...ProductListItem
                  id
                  name
                }
                cursor
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
        }
      }
    }
    
    fragment ProductListItem on Product {
      id
      name
      slug
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
          stop {
            gross {
              amount
              currency
            }
          }
        }
        priceRangeUndiscounted {
          start {
            gross {
              amount
              currency
            }
            net {
              amount
              currency
            }
          }
        }
      }
      category {
        id
        name
        slug
      }
      thumbnail(size: 1024, format: WEBP) {
        url
        alt
      }
      media {
        id
        url
        alt
      }
      defaultVariant {
        id
        quantityAvailable
        costPrice
      }
      images {
        id
        url
      }
      metadata {
        key
        value
      }
    }
    
    `,
    variables: { channel, first, after, collectionid },
  });
};

// address section

export const ADDRESS_LIST = () => {
  return JSON.stringify({
    query: `
    {
      me {
        id
        email
        firstName
        lastName
        addresses {
          city
          cityArea
          companyName
          country {
            country
            code
          }
          countryArea
          firstName
          id
          isDefaultBillingAddress
          isDefaultShippingAddress
          lastName
          phone
          postalCode
          streetAddress1
          streetAddress2
        }
        defaultBillingAddress {
          id
        }
        defaultShippingAddress {
          id
        }
      }
    }
    `,
  });
};

export const UPDATE_BILLING_ADDRESS = ({ addressId }) => {
  return JSON.stringify({
    query: `
    mutation SetDefaultBillingAddress($addressId: ID!) {
      accountSetDefaultAddress(id: $addressId, type: BILLING) {
        user {
          id
          email
          defaultBillingAddress {
            id
            firstName
            lastName
            streetAddress1
            city
            postalCode
            country {
              code
              country
            }
          }
        }
        errors {
          field
          message
        }
      }
    }
    `,
    variables: { addressId },
  });
};

export const UPDATE_SHIPPING_ADDRESS = ({ addressId }) => {
  return JSON.stringify({
    query: `
    mutation SetDefaultShippingAddress($addressId: ID!) {
      accountSetDefaultAddress(id: $addressId, type: SHIPPING) {
        user {
          id
          email
          defaultShippingAddress {
            id
            firstName
            lastName
            streetAddress1
            city
            postalCode
            country {
              code
              country
            }
          }
        }
        errors {
          field
          message
        }
      }
    }
    `,
    variables: { addressId },
  });
};

export const UPDATE_ADDRESS = ({ addressId, input }) => {
  return JSON.stringify({
    query: `
    mutation UpdateAddress($addressId: ID!, $input: AddressInput!) {
      accountAddressUpdate(id: $addressId, input: $input) {
        address {
          id
          firstName
          lastName
          streetAddress1
          streetAddress2
          city
          postalCode
          country {
            code
            country
          }
          countryArea
          phone
          isDefaultBillingAddress
          isDefaultShippingAddress
        }
        user {
          id
          email
        }
        errors {
          field
          message
        }
      }
    }
    `,
    variables: { addressId, input },
  });
};
