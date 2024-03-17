import { gql } from "@apollo/client";

export const RESTOCKING_PRODUCTS = gql`
  mutation RestockingProducts(
    $id: String!
    $name: String!
    $company: String!
    $type: String!
    $total: Float!
    $filterArray: [RestockingFilterInput!]!
  ) {
    restockingProduct(
      id: $id
      name: $name
      company: $company
      type: $type
      total: $total
      filterArray: $filterArray
    )
  }
`;
