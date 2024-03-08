import { gql } from "@apollo/client";

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $category: String
    $current: Float
    $reorderLevel: Float
    $unitCost: Float
    $sellingPrice: Float
    $taxInformation: Float
    $imageURL: String
    $supplier: String
  ) {
    addProduct(
      name: $name
      description: $description
      category: $category
      current: $current
      reorderLevel: $reorderLevel
      unitCost: $unitCost
      sellingPrice: $sellingPrice
      taxInformation: $taxInformation
      imageURL: $imageURL
      supplier: $supplier
    ) {
      id
      name
    }
  }
`;
