import { gql } from '@apollo/client';

export const GET_RESTOCKINGS = gql`
  query GetRestockings($company: String!, $type: String!) {
    getRestockings(company: $company, type: $type) {
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
        supplier
        quantity
      }
    }
  }
`;
