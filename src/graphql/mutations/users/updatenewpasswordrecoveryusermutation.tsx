import { gql } from "@apollo/client";

export const UPDATENEWPASSWORDRECOVERY_USER = gql`
  mutation updateNewPasswordRecoveryUser(
    $id: String!
    $password: String!
    $company: String!
    $type: String!
  ) {
    updateNewPasswordRecoveryUser(
      id: $id
      password: $password
      company: $company
      type: $type
    ) {
      id
    }
  }
`;
