import { gql } from "@apollo/client";


export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: String!
    $name: String
    $description: String
    $minimumQuantity: Float
    $currentQuantity: Float
    $reorderQuantity: Float
    $costCurrent: Float
    $costPrevious: Float
    $company: String!
    $type: String!
  ) {
    editProduct(
      id: $id
      name: $name
      description: $description
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
      minimumQuantity
      currentQuantity
      reorderQuantity
      costCurrent
      costPrevious
      active
    }
  }
`;