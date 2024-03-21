import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($company: String!, $type: String!, $take: Int, $skip: Int) {
    getTransactions(company: $company, type: $type, take: $take, skip: $skip) {
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
        taxInformation
        supplier
        quantity
      }
    }
  }
`;
