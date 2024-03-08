import { gql } from "@apollo/client";

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: String!
    $company: String!
    $type: String!
    $filterArray: [EditFilterInput!]!
  ) {
    editProduct(
      id: $id
      company: $company
      type: $type
      filterArray: $filterArray
    ) {
      id
      name
      description
      category
      current
      reorderLevel
      unitCost
      sellingPrice
      taxInformation
      imageURL
      supplier
      active
    }
  }
`;
