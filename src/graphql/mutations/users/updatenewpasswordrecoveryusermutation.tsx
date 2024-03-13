import { gql } from "@apollo/client";

export const UPDATENEWPASSWORDRECOVERY_USER = gql`
  mutation updateNewPasswordRecoveryUser(
    $email: String!
    $temporaryAccessKey: String!
    $password: String!
    $company: String!
  ) {
    updateNewPasswordRecoveryUser(
      email: $email
      temporaryAccessKey: $temporaryAccessKey
      password: $password
      company: $company
    ) {
      id
    }
  }
`;
