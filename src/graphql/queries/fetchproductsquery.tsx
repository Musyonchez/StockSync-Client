// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetProduct($company: String!, $type: String!) {
    activeProducts(company: $company, type: $type) {
      id
      name
      description
      minimumQuantity
      currentQuantity
      reorderQuantity
      costCurrent
      costPrevious
      active
    }
  }
`;