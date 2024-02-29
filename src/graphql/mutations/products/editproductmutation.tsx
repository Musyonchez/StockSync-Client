import { gql } from "@apollo/client";

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: String!
    $name: String
    $description: String
    $category: String
    $current: Float
    $reoderLevel: Float
    $unitCost: Float
    $sellingPrice: Float
    $taxInformation: Float
    $imageURL: String
    $supplier: String
    $company: String!
    $type: String!
  ) {
    editProduct(
      id: $id
      name: $name
      description: $description
      category: $category
      current: $current
      reoderLevel: $reoderLevel
      unitCost: $unitCost
      sellingPrice: $sellingPrice
      taxInformation: $taxInformation
      imageURL: $imageURL
      supplier: $supplier
      company: $company
      type: $type
    ) {
      id
      name
      description
      category
      current
      reoderLevel
      unitCost
      sellingPrice
      taxInformation
      imageURL
      supplier
      active
    }
  }
`;
