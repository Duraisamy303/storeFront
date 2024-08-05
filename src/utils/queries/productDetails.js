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
      priceRangeUndiscounted {
      start {
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
  thumbnail(size: 1024) {
    url
    alt
  }
  media {
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
     alt
      title
      caption
      description
      url
  }
  metadata {
    key
    value
  }
}
`;
