import { gql } from "@apollo/client";

export const SENDPASSWORDRECOVERYEMAIL_USER = gql`
  mutation sendPasswordRecoveryEmailUser(
    $id: String!
    $password: String!
    $company: String!
    $type: String!
  ) {
    sendPasswordRecoveryEmailUser(
      id: $id
      password: $password
      company: $company
      type: $type
    ) {
      id
    }
  }
`;
