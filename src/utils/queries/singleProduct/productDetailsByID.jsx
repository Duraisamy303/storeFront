export const SINGLE_PRODUCT = ({ productId, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($productId: ID!, $channel: String!) {
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
          quantityAvailable
        }
        created
        description
        images {
          url
        }
        defaultVariant {
          id
          name
          quantityAvailable
        }
      }
    }
    `,
    variables: { productId, channel },
  });
};

export const RELATED_PRODUCT = ({ id, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($id: ID!, $channel:String!) {
      category(id: $id) {
        id
        products(channel: $channel, first: 10) {
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

              defaultVariant {
                id
                quantityAvailable
              }
              
            }
          }
        }
      }
    }
    `,
    variables: { id, channel },
  });
};
