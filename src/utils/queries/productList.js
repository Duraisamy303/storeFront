import { PRODUCT_LIST_ITEM_FRAGMENT } from './productDetails';

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

