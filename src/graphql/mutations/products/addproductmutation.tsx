import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $group: String!
    $company: String!
    $type: String!
  ) {
    addProduct(
      name: $name
      description: $description
      group: $group

      company: $company
      type: $type
    ) {
      id
      name
      description
      group

      active
    }
  }
`;
