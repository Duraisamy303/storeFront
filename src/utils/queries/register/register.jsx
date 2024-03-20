export const REGISTER = ({ firstName, lastName, email, password }) => {
  console.log("firstName, lastName, email, password: ", firstName, lastName, email, password);
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
