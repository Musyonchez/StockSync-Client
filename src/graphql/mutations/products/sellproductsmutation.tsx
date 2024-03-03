import { gql } from '@apollo/client';

export const SELL_PRODUCTS = gql`
 mutation SellProducts($company: String!, $type: String!, $total: Float!, $filterArray: [SellFilterInput!]!) {
    sellProduct(company: $company, type: $type, total: $total, filterArray: $filterArray)
 }
`;
