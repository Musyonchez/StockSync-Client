import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $store1: Boolean!
    $store2: Boolean!
    $store3: Boolean!
    $store4: Boolean!
    $role: UserRole!
    $company: String!
    $type: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      store1: $store1
      store2: $store2
      store3: $store3
      store4: $store4
      role: $role
      company: $company
      type: $type
    ) {
      id
      firstName
      lastName
      email
      store1
      store2
      store3
      store4
      role
    }
  }
`;