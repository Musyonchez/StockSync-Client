import { gql } from "@apollo/client";

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $minimumQuantity: Int!
    $currentQuantity: Int!
    $reorderQuantity: Int!
    $costCurrent: Int!
    $costPrevious: Int!
  ) {
    addProduct(
      name: $name
      description: $description
      minimumQuantity: $minimumQuantity
      currentQuantity: $currentQuantity
      reorderQuantity: $reorderQuantity
      costCurrent: $costCurrent
      costPrevious: $costPrevious
    ) {
      id
      name
      # Add other fields as needed
    }
  }
`;
