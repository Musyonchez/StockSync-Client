import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $category: String!
    $company: String!
    $type: String!
  ) {
    addProduct(
      name: $name
      description: $description
      category: $category
      company: $company
      type: $type
    ) {
      id
      name
      description
      category
      imageURL
      active
    }
  }
`;
