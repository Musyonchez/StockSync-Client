import { gql } from "@apollo/client";

export const GET_RESTOCKINGS = gql`
  query GetRestockings(
    $company: String!
    $type: String!
    $take: Int
    $skip: Int
  ) {
    getRestockings(company: $company, type: $type, take: $take, skip: $skip) {
      id
      createdAt
      creatorId
      creatorName
      totalAmount
      totalProducts
      details {
        id
        name
        category
        current
        unitCost
        sellingPrice
        supplier
        quantity
      }
    }
  }
`;
