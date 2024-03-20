// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_ALL_ACTIVE_PRODUCTS = gql`
  query GetProduct($company: String!, $type: String!, $take: Int, $skip: Int) {
    activeProducts(company: $company, type: $type, take: $take, skip: $skip) {
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
      totalProducts 
    }
  }
`;
