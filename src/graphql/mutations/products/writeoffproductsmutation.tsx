import { gql } from "@apollo/client";

export const WRITEOFF_PRODUCTS = gql`
  mutation WriteoffProducts(
    $id: String!
    $name: String!
    $company: String!
    $type: String!
    $total: Float!
    $reason: String!
    $filterArray: [WriteoffFilterInput!]!
  ) {
    writeoffProduct(
      id: $id
      name: $name
      company: $company
      type: $type
      total: $total
      reason: $reason
      filterArray: $filterArray
    )
  }
`;
