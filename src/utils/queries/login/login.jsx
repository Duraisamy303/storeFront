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
          lastName
        }
      }
    }
    `,
    variables: { email, password },
  };
};


export const CHANGE_PASSWORD = ({ old_password, new_password }) => {
  return {
    query: `
    mutation PasswordChange($old_password: String!, $new_password: String!) {
      passwordChange( 
        newPassword: $new_password
        oldPassword: $old_password
      ) {
        user {
          id
          email
        }
        errors {
          field
          message
        }
      }
    }
    `,
    variables: { old_password, new_password },
  };
};
