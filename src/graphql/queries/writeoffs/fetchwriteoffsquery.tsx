import { gql } from '@apollo/client';

export const GET_WRITEOFFS = gql`
  query GetWriteoffs($company: String!, $type: String!) {
    getWriteoffs(company: $company, type: $type) {
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
