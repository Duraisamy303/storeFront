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
              id
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
  channel,
  email,
  city,
  lastName,
  lines,
  streetAddress1,
  firstName,
  country,
  postalCode,
  countryArea,
}) => {
  return {
    query: `
mutation CreateCheckout($channel: String!, $email: String!, $lines: [CheckoutLineInput!]!, $firstName: String!, $lastName: String!, $streetAddress1: String!, $city: String!, $postalCode: String!, $country: CountryCode!, $countryArea: String!) {
  checkoutCreate(
    input: {
      channel: $channel
      email: $email
      lines: $lines
      shippingAddress: {
        firstName: $firstName
        lastName: $lastName
        streetAddress1: $streetAddress1
        city: $city
        postalCode: $postalCode
        country: $country
        countryArea: $countryArea
      }
      billingAddress: {
        firstName: $firstName
        lastName: $lastName
        streetAddress1: $streetAddress1
        city: $city
        postalCode: $postalCode
        country: $country
        countryArea: $countryArea
      }
    }
  ) {
    checkout {
      id
      totalPrice {
        gross {
          amount
          currency
        }
      }
      isShippingRequired
    }
    errors {
      field
      code
    }
  }
}
      `,
    variables: {
      channel,
      email,
      city,
      lastName,
      lines,
      streetAddress1,
      firstName,
      country,
      postalCode,
      countryArea,
    },
  };
};

export const CHECKOUT_DELIVERY_METHOD = ({ id }) => {
  console.log("id: ", id);
  return {
    query: `
    mutation CheckoutUpdateDeliveryMethod($id: ID!) {
      checkoutDeliveryMethodUpdate(
        deliveryMethodId: "U2hpcHBpbmdNZXRob2Q6MQ=="
        id: $id
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
    variables: { id },
  };
};

export const CHECKOUT_COMPLETE = ({ id }) => {
  return {
    query: `
    mutation CheckoutComplete($id: ID!) {
      checkoutComplete(id: $id) {
        order {
          id
          status
        }
        errors {
          field
          message
        }
      }
    }
      `,
    variables: { id },
  };
};
