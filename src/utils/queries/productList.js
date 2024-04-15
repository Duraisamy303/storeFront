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
      wishlists(first: 100, filter: { user: $userEmail }) {
        edges {
          node {
            variant
            user {
              firstName
              email
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
  console.log("input: ", ids, channel);
  return JSON.stringify({
    query: `
    query MyQuery($ids: [ID!]!, $channel:String!) {
      products(
        filter: { ids: $ids }
        channel: $channel
        first: 10
      ) {
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
          }
        }
      }
    }
    `,
    variables: { ids, channel },
  });
};
