import { gql } from '@apollo/client';

export const GET_RESTOCKING = gql`
  query GetRestocking($id: String!, $company: String!, $type: String!) {
    getRestocking(id: $id, company: $company, type: $type) {
      id
      createdAt
      creatorId
      creatorName
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
