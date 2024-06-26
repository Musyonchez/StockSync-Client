import { gql } from '@apollo/client';

export const GET_TRANSACTION = gql`
  query GetTransaction($id: String!, $company: String!, $type: String!) {
    getTransaction(id: $id, company: $company, type: $type) {
      id
      createdAt
      creatorId
      creatorName
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
