export const ADDTOCART = ({ checkoutToken, variantId }) => {
  return {
    query: `
    mutation ProductAddVariantToCart($checkoutToken: UUID!, $variantId: ID!) {
      checkoutLinesAdd(
        token: $checkoutToken
        lines: [{quantity: 1, variantId: $variantId}]
      ) {
        checkout {
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
              quantityAvailable
            }
            quantity
          }
          totalPrice {
            gross {
              amount
              currency
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
              quantityAvailable
            }
            quantity
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

export const UPDATE_CART_QUANTITY = ({ checkoutId, lineId, quantity }) => {
  return {
    query: `
    mutation UpdateCart($checkoutId:,ID!,$lineId: ID!,$quantity:Int!) {
      checkoutLinesUpdate(
        id: $checkoutId
        lines: [{ quantity: $quantity, lineId:$lineId }]
      ) {
        checkout {
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
            quantity
          }
          totalPrice {
            gross {
              currency
              amount
            }
          }
        }
      }
    }
      `,
    variables: { checkoutId, lineId, quantity },
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
  console.log("first", lastName1);
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

export const CREATE_CHECKOUT_ID = ({ channel, lines }) => {
  return {
    query: `
    mutation CreateCheckout($channel: String!, $lines: [CheckoutLineInput!]!) {
      checkoutCreate(
        input: {
          channel: $channel
          lines: $lines
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
    variables: { channel, lines },
  };
};

export const APPLY_COUPEN_CODE = ({ checkoutId, languageCode, promoCode }) => {
  return {
    query: `
    mutation checkoutAddPromoCode($checkoutId: ID, $promoCode: String!, $languageCode: LanguageCodeEnum!) {
      checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
        errors {
          ...CheckoutErrorFragment
          __typename
        }
        checkout {
          ...CheckoutFragment
          __typename
        }
        __typename
      }
    }
    fragment CheckoutErrorFragment on CheckoutError {
      message
      field
      code
      __typename
    }
    fragment CheckoutFragment on Checkout {
      id
      email
      discount {
        ...Money
        __typename
      }
      voucherCode
      discountName
      translatedDiscountName
      giftCards {
        ...GiftCardFragment
        __typename
      }
      channel {
        id
        slug
        __typename
      }
      shippingAddress {
        ...AddressFragment
        __typename
      }
      billingAddress {
        ...AddressFragment
        __typename
      }
      authorizeStatus
      chargeStatus
      isShippingRequired
      user {
        id
        email
        __typename
      }
      availablePaymentGateways {
        ...PaymentGatewayFragment
        __typename
      }
      deliveryMethod {
        ... on ShippingMethod {
          id
          __typename
        }
        ... on Warehouse {
          id
          __typename
        }
        __typename
      }
      shippingMethods {
        id
        name
        price {
          ...Money
          __typename
        }
        maximumDeliveryDays
        minimumDeliveryDays
        __typename
      }
      totalPrice {
        gross {
          ...Money
          __typename
        }
        tax {
          ...Money
          __typename
        }
        __typename
      }
      shippingPrice {
        gross {
          ...Money
          __typename
        }
        __typename
      }
      subtotalPrice {
        gross {
          ...Money
          __typename
        }
        __typename
      }
      lines {
        ...CheckoutLineFragment
        __typename
      }
      __typename
    }
    fragment Money on Money {
      currency
      amount
      __typename
    }
    fragment GiftCardFragment on GiftCard {
      displayCode
      id
      currentBalance {
        ...Money
        __typename
      }
      __typename
    }
    fragment AddressFragment on Address {
      id
      city
      phone
      postalCode
      companyName
      cityArea
      streetAddress1
      streetAddress2
      countryArea
      country {
        country
        code
        __typename
      }
      firstName
      lastName
      __typename
    }
    fragment PaymentGatewayFragment on PaymentGateway {
      id
      name
      currencies
      config {
        field
        value
        __typename
      }
      __typename
    }
    fragment CheckoutLineFragment on CheckoutLine {
      id
      quantity
      totalPrice {
        gross {
          currency
          amount
          __typename
        }
        __typename
      }
      unitPrice {
        gross {
          ...Money
          __typename
        }
        __typename
      }
      undiscountedUnitPrice {
        ...Money
        __typename
      }
      variant {
        attributes(variantSelection: ALL) {
          values {
            name
            dateTime
            boolean
            translation(languageCode: $languageCode) {
              name
              __typename
            }
            __typename
          }
          __typename
        }
        id
        name
        translation(languageCode: $languageCode) {
          name
          __typename
        }
        product {
          name
          translation(languageCode: $languageCode) {
            language {
              code
              __typename
            }
            id
            name
            __typename
          }
          media {
            alt
            type
            url(size: 72)
            __typename
          }
          __typename
        }
        media {
          alt
          type
          url(size: 72)
          __typename
        }
        __typename
      }
      __typename
    }
    
      `,
    variables: { checkoutId, languageCode, promoCode },
  };
};

export const UPDATE_BILLING_ADDRESS = ({
  checkoutId,
  billingAddress,
  validationRules,
  languageCode,
}) => {
  return {
    query: `
    mutation checkoutBillingAddressUpdate($checkoutId: ID!, $billingAddress: AddressInput!, $validationRules: CheckoutAddressValidationRules) {
      checkoutBillingAddressUpdate(
        id: $checkoutId
        billingAddress: $billingAddress
        validationRules: $validationRules
      ) {
        errors {
          ...CheckoutErrorFragment
          __typename
        }
      
        __typename
      }
    }
    fragment CheckoutErrorFragment on CheckoutError {
      message
      field
      code
      __typename
    }
      `,
    variables: {
      checkoutId,
      billingAddress,
      validationRules,
      languageCode,
    },
  };
};
