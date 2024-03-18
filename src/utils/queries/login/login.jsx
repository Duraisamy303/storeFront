export const LOGIN = ({ email, password }) => {
  return {
    query: `
      mutation TokenCreate($email: String!, $password: String!) {
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
            lastName
          }
        }
      }
    `,
    variables: { email, password },
  };
};