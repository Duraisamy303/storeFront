export const SINGLE_PRODUCT = ({ productId, channel }) => {
  return JSON.stringify({
    query: `
   query MyQuery($productId: String!, $channel: String!) {
  product(slug: $productId, channel: $channel) {
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
      slug
    }
    thumbnail(size: 1024, format: WEBP) {
      url
      alt
    }
    media {
      url
      alt
      title
      caption
      description
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
    getUpsells {
      name
      productId
      id
    }
    getCrosssells {
      id
      name
      productId
    }
    seoTitle
    seoDescription
    attributes {
      attribute {
        name
      }
      values {
        name
      }
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
    query MyQuery($nextProductId:String!,$channel:String!) {
      product(slug: $nextProductId, channel: $channel) {
        id
        name
        slug
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
    query MyQuery($prevProductId:String!,$channel:String!) {
      product(slug: $prevProductId, channel: $channel) {
        id
        name
        slug
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
       seoDescription
       seoTitle
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
            pricing {
              price {
                gross {
                  amount
                  currency
                }
                currency
              }
            }
            name
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
                media{
                alt
                url
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
