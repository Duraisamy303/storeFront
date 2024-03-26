export const ADDTOCART = ({ checkoutToken, variantId }) => {
  return {
    query: `
      mutation ProductAddVariantToCart($checkoutToken: UUID!, $variantId: ID!) {
        checkoutLinesAdd(
          token: $checkoutToken
          lines: [{ quantity: 1, variantId: $variantId }]
        ) {
          checkout {
            id
            lines {
              id
              quantity
              variant {
                product {
                  id
                  name
                  slug
                  thumbnail {
                    url
                    alt
                  }
                }
                pricing {
                  price {
                    gross {
                      amount
                      currency
                    }
                  }
                }
                name
              }
            }
          }
          errors {
            message
          }
        }
      }
      
      
    
      `,
    variables: { checkoutToken, variantId },
  };
};

export const CART_LIST = ({ checkoutToken }) => {
  return JSON.stringify({
    query: `
      query CheckoutFetchByToken($checkoutToken: UUID!) {
        checkout(token: $checkoutToken) {
          id
          email
          lines {
            id
            totalPrice {
              gross {
                amount
                currency
              }
            }
            variant {
              product {
                id
                name
                slug
                thumbnail {
                  url
                  alt
                }
              }
              pricing {
                price {
                  gross {
                    amount
                    currency
                  }
                }
              }
              name
            }
          }
          totalPrice {
            gross {
              amount
              currency
            }
          }
        }
      }
      
      `,
    variables: { checkoutToken },
  });
};

export const CHECKOUT_TOKEN = ({ channel, email }) => {
  return {
    query: `
      mutation CheckoutCreate($channel:String, $email:String) {
        checkoutCreate(
          input: {channel: $channel, email: $email, lines: []}
        ) {
          checkout {
            token
          }
          errors {
            field
            code
          }
        }
      }
      `,
    variables: { channel, email },
  };
};

export const REMOVETOCART = ({ checkoutToken, lineId }) => {
  return {
    query: `
    mutation CheckoutRemoveProduct($checkoutToken: UUID!, $lineId: ID!) {
      checkoutLineDelete(token: $checkoutToken, lineId: $lineId) {
      checkout {
        token
      }
      errors {
        field
        message
      }
    }
    }
    
      `,
    variables: { checkoutToken, lineId },
  };
};

export const CHECKOUT_UPDATE_SHIPPING_ADDRESS = ({
  checkoutToken,
  city,
  streetAddress1,
  firstName,
  country,
  postalCode,
  state,
}) => {
  return {
    query: `
    mutation CheckoutUpdateShippingAddress($checkoutToken: ID!, $firstName: String!, $streetAddress1: String!, $country: CountryCode!, $city: String!, $postalCode: String!,$state: String) {
      checkoutShippingAddressUpdate(
        id: $checkoutToken
        shippingAddress: {firstName: $firstName, streetAddress1: $streetAddress1, city: $city, country: $country, postalCode: $postalCode, countryArea: $state}
      ) {
        checkout {
          id
        }
        errors {
          field
          message
          code
        }
      }
    }
    
      `,
    variables: {
      checkoutToken,
      city,
      streetAddress1,
      firstName,
      country,
      postalCode,
      state,
    },
  };
};
