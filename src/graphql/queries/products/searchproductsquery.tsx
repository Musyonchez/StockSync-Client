// Example GraphQL query (replace with your actual query)
import { gql } from '@apollo/client';

export const SEARCH_PRODUCTS = gql`
query SearchProducts($company: String!, $type: String!, $filterArray: [FilterInput!]!) {
    search(company: $company, type: $type, filterArray: $filterArray) {
      id
      name
      description
      category
      current
      reoderLevel
      unitCost
      sellingPrice
      taxInformation
      imageURL
      supplier
      active
    }
  }
  
`;
