export const PRODUCT_LIST = ({ channel, first }) => {
  console.log("channel, first : ", channel, first );
  return JSON.stringify({
    query: `
    query ProductListPaginated($first: Int!, $after: String, $channel: String!) {
      collections(first: $first, channel: $channel) {
        edges {
          node {
            id
            name
            products(first: $first, after: $after) {
              totalCount
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
                  }
                  thumbnail(size: 1024, format: WEBP) {
                    url
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
  `,
    variables: { channel, first },
  });
};

