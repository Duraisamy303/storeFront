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

export const CHECKOUT_TOKEN_WITHOUT_EMAIL = ({ channel }) => {
  return {
    query: `
    mutation CheckoutCreate($channel:String, ) {
      checkoutCreate(
        input: {channel: $channel,  lines: []}
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
    variables: { channel },
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
  lines,
  firstName,
  lastName,
  streetAddress1,
  city,
  postalCode,
  country,
  countryArea,
  firstName1,
  lastName1,
  streetAddress2,
  city1,
  postalCode1,
  country1,
  countryArea1,
}) => {
  console.log("first", 
  lastName1,
 )
  return {
    query: `
    mutation CreateCheckout($channel: String!, $email: String!, $lines: [CheckoutLineInput!]!, $firstName: String!, $lastName: String!, $streetAddress1: String!, $city: String!, $postalCode: String!, $country: CountryCode!, $countryArea: String!,$firstName1: String!, $lastName1: String!, $streetAddress2: String!, $city1: String!, $postalCode1: String!, $country1: CountryCode!, $countryArea1: String!) {
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
            firstName: $firstName1
            lastName: $lastName1
            streetAddress1: $streetAddress2
            city: $city1
            postalCode: $postalCode1
            country: $country1
            countryArea: $countryArea1
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
      lines,
      firstName,
      lastName,
      streetAddress1,
      city,
      postalCode,
      country,
      countryArea,
      firstName1,
      lastName1,
      streetAddress2,
      city1,
      postalCode1,
      country1,
      countryArea1,
    },
  };
};

export const CHECKOUT_DELIVERY_METHOD = ({ id }) => {
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
