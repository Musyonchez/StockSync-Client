import { gql } from '@apollo/client';

export const GET_WRITEOFFS = gql`
  query GetWriteoffs($company: String!, $type: String!, $take: Int, $skip: Int) {
    getWriteoffs(company: $company, type: $type, take: $take, skip: $skip) {
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
