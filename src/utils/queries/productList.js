import { PRODUCT_LIST_ITEM_FRAGMENT } from "./productDetails";

export const PRODUCT_LIST = ({ channel, first }) => {
  return JSON.stringify({
    query: `
      query ProductListPaginated($first: Int!, $after: String, $channel: String!) {
        products(first: $first, after: $after, channel: $channel) {
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
