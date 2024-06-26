// Example GraphQL query (replace with your actual query)
import { gql } from "@apollo/client";

export const SEARCH_PRODUCTS = gql`
  query SearchProducts(
    $company: String!
    $type: String!
    $filterArray: [SearchFilterInput]!
  ) {
    searchProducts(company: $company, type: $type, filterArray: $filterArray) {
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
