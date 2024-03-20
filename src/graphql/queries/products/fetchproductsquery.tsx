import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetProducts($company: String!, $type: String!, $take: Int, $skip: Int) {
    products(company: $company, type: $type, take: $take, skip: $skip) {
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
