// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query GetProduct($id: String!, $company: String!, $type: String!) {
    product(id: $id, company: $company, type: $type) {
      id
      name
      description
      category
      current
      reorderLevel
      unitCost
      sellingPrice
      taxInformation
      imageURL
      supplier
      active
    }
  }
`;


