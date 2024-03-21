import { gql } from '@apollo/client';

export const GET_WRITEOFF = gql`
  query GetWriteoff($id: String!, $company: String!, $type: String!) {
    getWriteoff(id: $id, company: $company, type: $type) {
      id
      createdAt
      creatorId
      creatorName
      totalAmount
      reason
      details {
        id
        name
        category
        current
        unitCost
        sellingPrice
        quantity
      }
    }
  }
`;
