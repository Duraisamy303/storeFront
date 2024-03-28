export const SINGLE_PRODUCT = ({ productId }) => {
  return JSON.stringify({
    query: `
    query MyQuery($productId: ID!) {
        product(id: $productId, channel: "india-channel") {
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
    variables: { productId },
  });
};
  