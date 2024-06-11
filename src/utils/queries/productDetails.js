export const PRODUCT_LIST_ITEM_FRAGMENT = `
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
    discount {
      currency
    }
  }
  category {
    id
    name
  }
  thumbnail(size: 1024) {
    url
    alt
  }
  images {
    url
  }
  created
  description
  defaultVariant {
    id
    quantityAvailable
    costPrice
    sku
  }
  media {
    id
    url
  }
  metadata {
    key
    value
  }
}
`;
