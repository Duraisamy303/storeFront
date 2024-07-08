export const REGISTER = ({ firstName, lastName, email, password }) => {
  return {
    query: `
    mutation RegisterMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      accountRegister(input: {email: $email, password: $password, channel: "india-channel", firstName: $firstName, lastName: $lastName}) {
        errors {
          field
          code
          message
        }
        user {
          email
          isActive
          isConfirmed
          lastName
          firstName
          id
        }
      }
    }
    `,
    variables: { firstName, lastName, email, password },
  };
};

export const GET_ORDER_LIST_BY_EMAIL = ({ email }) => {
  return {
    query: `
    query orders($email: String!) {
      orders(filter: { customer: $email }, first: 10) {
        totalCount
        edges {
          node {
            id
            created
            status
            total {
              gross {
                amount
              }
            }
            lines {
              id
              productName
              quantity
              totalPrice {
                gross {
                  amount
                }
              }
            }
          }
        }
      }
    }
    `,
    variables: { email },
  };
};

export const FORGET_PASSWORD = ({ email, redirectUrl }) => {
  return {
    query: `
   mutation RequestPasswordReset($email:String!,$redirectUrl:String!) {
  requestPasswordReset(
    email: $email
    redirectUrl: $redirectUrl
    channel: "india-channel"
  ) {
    errors {
      code
      field
      message
    }
  }
}
    `,
    variables: { email, redirectUrl },
  };
};

export const RESET_PASSWORD = ({ token, email, password }) => {
  return {
    query: `
 mutation setPassword($token:String!, $email:String!,$password:String!) {
  setPassword(token: $token, email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `,
    variables: { token, email, password },
  };
};
