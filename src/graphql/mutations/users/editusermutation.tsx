// editusermutation.ts

import { gql } from "@apollo/client";

export const EDIT_USER = gql`
  mutation EditUser(
    $id: String!
    $company: String!
    $type: String!
    $filterArray: [EditFilterInput!]!
  ) {
    editUser(
      id: $id
      company: $company
      type: $type
      filterArray: $filterArray
    ) {
      id
      firstName
      lastName
      email
      store1
      store2
      store3
      store4
      company
      role
      firstsignin
    }
  }
`;
