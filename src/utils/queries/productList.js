import { PRODUCT_LIST_ITEM_FRAGMENT } from "./productDetails";

export const PRODUCT_LIST = ({
  first,
  last,
  after,
  before,
  channel,
  sortBy,
  filter,
}) => {
  return JSON.stringify({
    query: `
query ProductListPaginated($first: Int, $last :Int, $after: String, $before: String, $channel: String!, $sortBy: ProductOrder,$filter:ProductFilterInput!) {
  productsSearch(
    first: $first
    last : $last
    after: $after
    before: $before
    channel: $channel
    filter: $filter
    sortBy: $sortBy
  ) {
    totalCount
     edges {
      node {
        ...ProductListItem
        variants {
          id
          name
          sku
           pricing {
            price {
              gross {
                amount
              }
            }
          }
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

    
      ${PRODUCT_LIST_ITEM_FRAGMENT}
    `,
    variables: { first, last, after, before, channel, sortBy, filter },
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
          tax {
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
        isGiftWrap
        paymentMethod {
          name
        }
        shippingPrice {
          gross {
            amount
            currency
          }
        }
        giftCards {
          currentBalance {
            amount
            currency
          }
          id
          code
          initialBalance {
            amount
            currency
          }
        }
    codAmount
    giftWrapAmount
      }
    }
    `,
    variables: { orderId },
  });
};

export const MY_ORDER_LIST = ({ first }) => {
  return JSON.stringify({
    query: `
    query Myorders($first: Int!) {
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
              invoices {
                id
                url
              }
              isGiftWrap
              shippingPrice {
                gross {
                  amount
                  currency
                }
              }
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
            media {
              url
              alt
            }
            name
            description
           variants {
          id
          name
          sku
           pricing {
            price {
              gross {
                amount
              }
            }
          }
        }
          slug
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
  categories(
    first: 100
    level: 0
    where: {}
     filter: {ids: ["Q2F0ZWdvcnk6MTI0MTU=","Q2F0ZWdvcnk6MTIxNTI=","Q2F0ZWdvcnk6MTE3NDE=","Q2F0ZWdvcnk6MTE2NTU=","Q2F0ZWdvcnk6MTE2NTI=","Q2F0ZWdvcnk6MTE2NDc="]}

  ) {
    edges {
      node {
        id
        name
        slug
        productsWithoutHiddenCategory(channel: $channel) {
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

export const PRODUCT_FILTER = ({
  channel,
  first,
  after,
  filter,
  sortBy,
  last,
  before,
}) => {
  return JSON.stringify({
    query: `
 query FilterProducts($channel: String!, $first: Int, $after: String, $filter: ProductFilterInput!,$sortBy:ProductOrder,$last: Int,$before:String) {
  productsSearch(filter: $filter, channel: $channel, first: $first, after: $after,sortBy:$sortBy,last:$last,before:$before) {
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
            priceRangeUndiscounted {
            start {
              gross {
                amount
              }
            }
          }
          discount {
            gross {
              amount
            }
          }
        }
            defaultVariant {
              id
              sku
              quantityAvailable
            }
        category {
          id
          name
          slug
          description
          backgroundImageUrl
        }
        thumbnail(size: 1024, format: WEBP) {
          url
          alt
        }
        created
        media {
          url
           alt
          caption
          description
          title
        }
        variants {
          id
          name
          sku
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
        }
        description
        metadata {
          key
          value
        }
        defaultVariant {
          id
        }
        seoDescription
        seoTitle
      }
    }
        totalCount
        pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    `,
    variables: { channel, first, after, filter, sortBy, last, before },
  });
};

export const LOOT_LIST = ({ channel, first, after, filter }) => {
  return JSON.stringify({
    query: `
    query FilterProducts($channel: String!, $first: Int!, $after: String, $filter: ProductFilterInput!) {
  productsSearch(
    filter: $filter
    channel: $channel
    first: $first
    after: $after
    where: {category: {eq: "Q2F0ZWdvcnk6MTIwMjQ="}}
  ) {
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
          priceRangeUndiscounted {
            start {
              gross {
                amount
              }
            }
          }
          discount {
            gross {
              amount
            }
          }
        }
        defaultVariant {
          id
          sku
        }
        category {
          id
          slug
          name
          description
        }
        thumbnail(size: 1024, format: WEBP) {
          url
          alt
        }
        created
        media {
          url
          alt
          caption
          description
          title
        }
        variants {
          id
        }
        description
        metadata {
          key
          value
        }
        defaultVariant {
          id
        }
        seoDescription
        seoTitle
      }
    }
  }
}
    `,
    variables: { channel, first, after, filter },
  });
};

export const MAX_PRICE = ({ first, channel, filter, after, sortBy }) => {
  return JSON.stringify({
    query: `
    query ProductListPaginated($first: Int, $after: String, $channel: String!, $sortBy: ProductOrder, $filter: ProductFilterInput!) {
  productsSearch(
    first: $first
    after: $after
    channel: $channel
    filter: $filter
    sortBy: $sortBy
  ) {
    edges {
      node {
        ...ProductListItem
        variants {
          id
          name
        }
      }
      cursor
    }
    totalCount
  }
}

fragment ProductListItem on Product {
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
    discount {
      currency
    }
    priceRangeUndiscounted {
      start {
        gross {
          amount
          currency
        }
      }
    }
  }
}
    `,
    variables: { channel, first, after, filter, sortBy },
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

export const ORDER_CANCEL = ({ id }) => {
  return JSON.stringify({
    query: `mutation customerCancelOrder($id: ID!) {
      customerOrderCancel(id: $id) {
        order {
          id
          status
        }
        errors {
          field
          message
        }
      }
      
    }
    `,
    variables: { id },
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

export const FEATURE_PRODUCT = ({ first, after, channel, filter }) => {
  return JSON.stringify({
    query: `
   query Featuredproduct($channel: String!, $first: Int!, $after: String, $filter: ProductFilterInput!) {
  productsSearch(filter: $filter, channel: $channel, first: $first, after: $after) {
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
            priceRangeUndiscounted {
            start {
              gross {
                amount
              }
            }
          }
          discount {
            gross {
              amount
            }
          }
        }
            defaultVariant {
              id
              sku
              quantityAvailable
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
        media {
          url
           alt
          caption
          description
          title
        }
        variants {
          id
          name
          sku
           pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }

        }
        description
        metadata {
          key
          value
        }
        defaultVariant {
          id
        }
        seoDescription
        seoTitle
        video {
          url
        }
      }
    }
  }
}
    
    `,
    variables: { first, after, channel, filter },
  });
};

export const SHOP_PAGINATION = ({
  first,
  after,
  channel,
  sortBy,
  page,
  filter,
}) => {
  console.log(
    "first, after, channel, filter, page: ",
    first,
    after,
    channel,
    filter,
    page
  );
  return JSON.stringify({
    query: `
    query ProductListPaginated($first: Int!, $after: String, $channel: String!, $sortBy: ProductOrder,$page:Int,$filter: ProductFilterInput!) {
  findProductsEndcursor(
    first: $first
    after: $after
    channel: $channel
    sortBy: $sortBy
    page: $page
    filter: $filter
  ) {
    totalCount
    edges {
      node {
        ...ProductListItem
        variants {
          id
          name
          sku
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
    discount {
      currency
    }
    priceRangeUndiscounted {
      start {
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
  }
  thumbnail(size: 1024) {
    url
    alt
  }
  media {
    url
  }
  created
  description
  defaultVariant {
    id
    quantityAvailable
    costPrice
    sku
  }
  media {
    id
    alt
    title
    caption
    description
    url
  }
  metadata {
    key
    value
  }
}
    `,
    variables: { first, after, channel, sortBy, page, filter },
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

export const PAYMENT_LIST = () => {
  return JSON.stringify({
    query: `
    query GetPaymnetGatewayList {
  paymentGateways(first: 10) {
    edges {
      node {
        description
        id
        isActive
        name
      }
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

export const ATTRIBUTE_LIST = () => {
  return JSON.stringify({
    query: `
   query AttributeList {
  attributes(
    channel: "india-channel"
    filter: {visibleInStorefront: true}
    first: 100
  ) {
    edges {
      node {
        id
        name
        slug
        choices(first: 5) {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    }
  }
}
    `,
    variables: {},
  });
};

export const PRE_ORDER_LIST = ({
  first,
  after,
  channel,
  filter,
  sortBy,
  last,
  before,
}) => {
  return JSON.stringify({
    query: `
    query Featuredproduct($channel: String!, $first: Int, $after: String, $filter: ProductFilterInput!,$sortBy:ProductOrder,$last:Int,$before:String) {
    productsSearch(filter: $filter, channel: $channel, first: $first, after: $after,sortBy:$sortBy, last: $last, before: $before) {
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
          priceRangeUndiscounted {
            start {
              gross {
                amount
              }
            }
          }
          discount {
            gross {
              amount
            }
          }
        }
       defaultVariant {
          id
          sku
          quantityAvailable
          pricing {
            price {
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
        media {
          url
          alt
          caption
          description
          title
        }
        variants {
          id
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
          name
        }
        description
        metadata {
          key
          value
        }
       defaultVariant {
          id
          sku
          quantityAvailable
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
        }
        seoDescription
        seoTitle
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
    
    `,
    variables: { first, after, channel, filter, sortBy, last, before },
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

export const PRODUCT_SEARCH = ({ search, channel }) => {
  return JSON.stringify({
    query: `query GlobalSearch($channel: String!, $search: String!) {
  productsSearch(
    channel: $channel
    first: 20
    search: $search
    sortBy: {direction: DESC, field: CREATED_AT}
  ) {
    edges {
      node {
        id
        name
        slug
        defaultVariant {
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
        }
        thumbnail {
          url
          alt
        }
      }
    }
  }
}

    `,
    variables: { search, channel },
  });
};

export const PRODUCT_20_PERCENTAGE = ({ channel, first, after, filter }) => {
  return JSON.stringify({
    query: `
   query discount20percentage($channel: String!, $first: Int!, $after: String, $filter: ProductFilterInput!) {
  productsSearch(filter: $filter, channel: $channel, first: $first, after: $after) {
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
            priceRangeUndiscounted {
            start {
              gross {
                amount
              }
            }
          }
          discount {
            gross {
              amount
            }
          }
        }
            defaultVariant {
              id
              sku
              quantityAvailable
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
        media {
          url
           alt
          caption
          description
          title
        }
        variants {
          id
          name
          sku
           pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
        }
        description
        metadata {
          key
          value
        }
        defaultVariant {
          id
        }
        seoDescription
        seoTitle
      }
    }
  }
}
    
    `,
    variables: { channel, first, after, filter },
  });
};

export const SUB_CAT_LIST = ({ slug }) => {
  return {
    query: `
    query GetSubCategoryList( $slug: String = "") {
  category( slug: $slug) {
    id
    name
    children(first: 100) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
}
      `,
    variables: { slug },
  };
};

export const CATEGORY_NAME = ({ categoryid, slug }) => {
  return JSON.stringify({
    query: `
 query GetCategoryName($slug: String = "", $categoryId: ID) {
  category(slug: $slug, id: $categoryId) {
    name
    slug
    parent {
      id
      name
      slug
    }
  }
}
      `,
    variables: { categoryid, slug },
  });
};

export const TAG_NAME = ({ id }) => {
  return JSON.stringify({
    query: `
  query GetTagName($id: ID!) {
  tagById(id: $id) {
    id
    name
    slug
  }
}
      `,
    variables: { id },
  });
};

export const USER_INFO = () => {
  return JSON.stringify({
    query: `
 query {
  me {
    id
    email
    firstName
    lastName
    
  }
}
      `,
    variables: {},
  });
};

export const LOGOUT = () => {
  return JSON.stringify({
    query: `
    mutation {
      tokensDeactivateAll {
        errors {
          field
          message
          code
        }
      }
    }
      `,
    variables: {},
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

export const UPDATE_BILLING_ADDRESS_ADDRESS_SECTION = ({ addressId }) => {
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

export const UPDATE_SHIPPING_ADDRESS_ADDRESS_SECTION = ({ addressId }) => {
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

export const DELETE_ADDRESS = ({ id }) => {
  return JSON.stringify({
    query: `
    mutation DeleteAddress($id: ID!) {
      accountAddressDelete(id: $id) {
        errors {
          addressType
          code
          field
          message
        }
      }
    }
    `,
    variables: { id },
  });
};

export const DELETE_COUPON = ({ checkoutId, languageCode, promoCode }) => {
  return JSON.stringify({
    query: `
mutation checkoutRemovePromoCode($checkoutId: ID, $promoCode: String, $promoCodeId: ID, $languageCode: LanguageCodeEnum!) {
  checkoutRemovePromoCode(
    checkoutId: $checkoutId
    promoCode: $promoCode
    promoCodeId: $promoCodeId
  ) {
    errors {
      ...CheckoutErrorFragment
      __typename
    }
    checkout {
      ...CheckoutFragment
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
fragment CheckoutFragment on Checkout {
  id
  email
  discount {
    ...Money
    __typename
  }
  voucherCode
  discountName
  translatedDiscountName
  giftCards {
    ...GiftCardFragment
    __typename
  }
  channel {
    id
    slug
    __typename
  }
  shippingAddress {
    ...AddressFragment
    __typename
  }
  billingAddress {
    ...AddressFragment
    __typename
  }
  authorizeStatus
  chargeStatus
  isShippingRequired
  user {
    id
    email
    __typename
  }
  availablePaymentGateways {
    ...PaymentGatewayFragment
    __typename
  }
  deliveryMethod {
    ... on ShippingMethod {
      id
      __typename
    }
    ... on Warehouse {
      id
      __typename
    }
    __typename
  }
  shippingMethods {
    id
    name
    price {
      ...Money
      __typename
    }
    maximumDeliveryDays
    minimumDeliveryDays
    __typename
  }
  totalPrice {
    gross {
      ...Money
      __typename
    }
    tax {
      ...Money
      __typename
    }
    __typename
  }
  shippingPrice {
    gross {
      ...Money
      __typename
    }
    __typename
  }
  subtotalPrice {
    gross {
      ...Money
      __typename
    }
    __typename
  }
  lines {
    ...CheckoutLineFragment
    __typename
  }
  __typename
}
fragment Money on Money {
  currency
  amount
  __typename
}
fragment GiftCardFragment on GiftCard {
  displayCode
  id
  currentBalance {
    ...Money
    __typename
  }
  __typename
}
fragment AddressFragment on Address {
  id
  city
  phone
  postalCode
  companyName
  cityArea
  streetAddress1
  streetAddress2
  countryArea
  country {
    country
    code
    __typename
  }
  firstName
  lastName
  __typename
}
fragment PaymentGatewayFragment on PaymentGateway {
  id
  name
  currencies
  config {
    field
    value
    __typename
  }
  __typename
}
fragment CheckoutLineFragment on CheckoutLine {
  id
  quantity
  totalPrice {
    gross {
      currency
      amount
      __typename
    }
    __typename
  }
  unitPrice {
    gross {
      ...Money
      __typename
    }
    __typename
  }
  undiscountedUnitPrice {
    ...Money
    __typename
  }
  variant {
    attributes(variantSelection: ALL) {
      values {
        name
        dateTime
        boolean
        translation(languageCode: $languageCode) {
          name
          __typename
        }
        __typename
      }
      __typename
    }
    id
    name
    translation(languageCode: $languageCode) {
      name
      __typename
    }
    product {
      name
      translation(languageCode: $languageCode) {
        language {
          code
          __typename
        }
        id
        name
        __typename
      }
      media {
        alt
        type
        url(size: 72)
        __typename
      }
      __typename
    }
    media {
      alt
      type
      url(size: 72)
      __typename
    }
    __typename
  }
  __typename
}
 `,
    variables: { checkoutId, languageCode, promoCode },
  });
};

export const FILTER_OPTION = ({ filter }) => {
  return {
    query: `
   query AttributeFilter($filter: ProductFilterInput!) {
  attributefilter(filter: $filter, channel: "india-channel") {
   filterData
  }
}
      `,
    variables: { filter },
  };
};

export const ADD_NEW_ADDRESS = ({ input }) => {
  return {
    query: `
    mutation AddAddress($input: AddressInput!) {
  accountAddressCreate(input: $input) {
    address {
      id
      streetAddress1
      city
      postalCode
      country {
        code
      }
    }
    errors {
      field
      message
    }
  }
}
    `,
    variables: { input },
  };
};
