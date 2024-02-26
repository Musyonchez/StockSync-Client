import { gql } from "@apollo/client";

export const EDIT_USER = gql`
mutation EditUser(
  $id: String!
  $firstName: String
  $lastName: String
  $age: Int
  $store1: Boolean
  $store2: Boolean
  $store3: Boolean
  $store4: Boolean
  $role: UserRole
  $company: String!
  $type: String!
) {
  editUser(
    id: $id
    firstName: $firstName
    lastName: $lastName
    age: $age
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
    age
    store1
    store2
    store3
    store4
    role
  }
}
`;