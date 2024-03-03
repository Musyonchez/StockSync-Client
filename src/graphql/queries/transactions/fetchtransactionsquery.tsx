import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($company: String!, $type: String!) {
    getTransactions(company: $company, type: $type) {
      id
      createdAt
      totalAmount
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
