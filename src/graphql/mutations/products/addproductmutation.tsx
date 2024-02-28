import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $group: String!
    $minimumQuantity: Float!
    $currentQuantity: Float!
    $reorderQuantity: Float!
    $costCurrent: Float!
    $costPrevious: Float!
    $company: String!
    $type: String!
  ) {
    addProduct(
      name: $name
      description: $description
      group: $name
      minimumQuantity: $minimumQuantity
      currentQuantity: $currentQuantity
      reorderQuantity: $reorderQuantity
      costCurrent: $costCurrent
      costPrevious: $costPrevious
      company: $company
      type: $type
    ) {
      id
      name
      description
      group
      minimumQuantity
      currentQuantity
      reorderQuantity
      costCurrent
      costPrevious
      active
    }
  }
`;