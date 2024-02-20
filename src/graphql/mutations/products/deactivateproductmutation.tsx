
import { gql } from "@apollo/client";


export const DEACTIVATE_PRODUCT = gql`
  mutation DeactivateProduct($id: String!, $company: String!, $type: String!) {
    deactivateProduct(id: $id, company: $company, type: $type) {
      id
    }
  }
`;
