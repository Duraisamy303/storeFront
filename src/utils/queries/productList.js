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

export const ORDER_LIST = ({ orderid }) => {
  return JSON.stringify({
    query: `
    query MyQuery($orderid:ID!) {
      order(id: $orderid) {
        lines {
          id
          productName
          productSku
          quantity
          thumbnail {
            url
          }
          totalPrice {
            currency
            gross {
              amount
              currency
            }
          }
        }
      }
    }
    `,
    variables: { orderid },
  });
};

export const ADD_WISHLIST = ({ input }) => {
  console.log("input: ", input);
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
  console.log("input: ", userEmail);
  return JSON.stringify({
    query: `
    query GetWishListQuery($userEmail: String!) {
      wishlists(first: 100, filter: {user: $userEmail}) {
        edges {
          node {
            variant
            user {
              firstName
              email
            }
            product {
              id
              name
              slug
              media {
                alt
                url
              }
              category {
                id
                name
              }
              indiaChannelPricing
              defaultVariant {
                id
                name
              }
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

export const FEATURE_PRODUCT = () => {
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
    }
    
    `,
  });
};
