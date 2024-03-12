import { gql } from "@apollo/client";

export const UPDATENEWPASSWORDRECOVERY_USER = gql`
  mutation updateNewPasswordRecoveryUser(
    $id: String!
    $temporaryAccessKey: String!
    $password: String!
    $company: String!
    $type: String!
  ) {
    updateNewPasswordRecoveryUser(
      id: $id
      temporaryAccessKey: $temporaryAccessKey
      password: $password
      company: $company
      type: $type
    ) {
      id
    }
  }
`;
