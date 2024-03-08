import { gql } from "@apollo/client";

export const SELL_PRODUCTS = gql`
  mutation SellProducts(
    $id: String!
    $name: String!
    $company: String!
    $type: String!
    $total: Float!
    $filterArray: [SellFilterInput!]!
  ) {
    sellProduct(
      id: $id
      name: $name
      company: $company
      type: $type
      total: $total
      filterArray: $filterArray
    )
  }
`;
