export const LOGIN = ({ email, password }) => {
  return {
    query: `
    mutation LoginMutation($email: String!, $password: String!) {
      tokenCreate(email: $email, password: $password) {
        token
        refreshToken
        errors {
          field
          message
        }
        user {
          email
          firstName
          id
        }
      }
    }
    `,
    variables: { email, password },
  };
};
