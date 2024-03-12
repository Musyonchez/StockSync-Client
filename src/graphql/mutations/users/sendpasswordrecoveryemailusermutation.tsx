import { gql } from "@apollo/client";

export const SENDPASSWORDRECOVERYEMAIL_USER = gql`
  mutation sendPasswordRecoveryEmailUser($email: String!, $company: String!) {
    sendPasswordRecoveryEmailUser(email: $email, company: $company) {
      id
    }
  }
`;
