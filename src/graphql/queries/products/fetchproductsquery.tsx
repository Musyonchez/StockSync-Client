// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetProducts($company: String!, $type: String!) {
    products(company: $company, type: $type) {
      id
      name
      description
      group
      minimumQuantity
      currentQuantity
      reorderQuantity
      costCurrent
      costPrevious
      active
    }
  }
`;