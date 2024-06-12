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
      name
      pricing {
        price {
          gross {
            amount
            currency
          }
        }
        costPrice {
          gross {
            amount
            currency
          }
        }
      }
        sku
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
      sku
      costPrice
    }
    metadata {
      key
      value
    }
    tags {
      name
      id
    }
    productFinish {
      id
      name
    }
    productstyle {
      id
      name
    }
    prouctDesign {
      id
      name
    }
    productStoneType {
      id
      name
    }
    nextProduct
    previousProduct
    productSize {
      id
      name
    }
    productStonecolor {
      id
      name
    }
    productItemtype {
      id
      name
    }
  }
}
    `,
    variables: { productId, channel },
  });
};

export const NEXT_PRODUCT = ({ nextProductId, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($nextProductId:ID!,$channel:String!) {
      product(id: $nextProductId, channel: $channel) {
        id
        name
        thumbnail {
          url
          alt
        }
        pricing {
          priceRange {
            start {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
    }
    
    `,
    variables: { nextProductId, channel },
  });
};

export const PREV_PRODUCT = ({ prevProductId, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($prevProductId:ID!,$channel:String!) {
      product(id: $prevProductId, channel: $channel) {
        id
        name
        thumbnail {
          url
          alt
        }
        pricing {
          priceRange {
            start {
              gross {
                amount
                currency
              }
            }
          }
        }
      }
    }
    
    `,
    variables: { prevProductId, channel },
  });
};

export const RELATED_PRODUCT = ({ id, channel }) => {
  return JSON.stringify({
    query: `
    query MyQuery($id: ID!, $channel: String!) {
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
                costPrice
              }
              category {
                id
                name
              }
              metadata {
                key
                value
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
