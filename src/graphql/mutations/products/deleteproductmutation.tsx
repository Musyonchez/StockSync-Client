import { gql } from "@apollo/client";


export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!, $company: String!, $type: String!) {
    deleteProduct(id: $id, company: $company, type: $type) {
      id
    }
  }
`;
