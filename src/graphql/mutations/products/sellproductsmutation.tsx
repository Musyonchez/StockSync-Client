import { gql } from '@apollo/client';

export const SELL_PRODUCTS = gql`
  mutation SellProducts($company: String!, $type: String!, $filterArray: [SellFilterInput!]!) {
    sellProduct(company: $company, type: $type, filterArray: $filterArray) {
      id
      name
      current
    }
  }
`;
