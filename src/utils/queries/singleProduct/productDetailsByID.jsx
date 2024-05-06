export const SINGLE_PRODUCT = ({ productId, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($productId: ID!,$channel: String!) {
        product(id: $productId, channel: $channel) {
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
          }
          category {
            id
            name
          }
          thumbnail(size: 1024, format: WEBP) {
            url
            alt
          }
          images {
            url
            alt
          }
          variants {
            id
          }
          created
          description
          images {
            url
          }
        }
      }
    `,
    variables: { productId, channel },
  });
};

export const RELATED_PRODUCT = ({ id }) => {
  return JSON.stringify({
    query: `
    query MyQuery($id: ID!) {
      category(id: $id) {
        id
        products(channel: "india-channel", first: 10) {
          edges {
            node {
              id
              name
              slug
              images {
                url
                alt
              }
              thumbnail(size: 1024, format: WEBP) {
                url
                alt
              }
              variants {
                id
              }
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
              }
              description
            }
          }
        }
      }
    }
    `,
    variables: { id },
  });
};
