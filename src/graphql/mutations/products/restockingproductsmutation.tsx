import { gql } from "@apollo/client";

export const RESTOCKING_PRODUCTS = gql`
  mutation RestockingProducts(
    $id: String!
    $name: String!
    $company: String!
    $type: String!
    $filterArray: [RestockingFilterInput!]!
  ) {
    restockingProduct(
      id: $id
      name: $name
      company: $company
      type: $type
      filterArray: $filterArray
    )
  }
`;
