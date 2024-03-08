
import { gql } from "@apollo/client";


export const DEACTIVATE_USER = gql`
  mutation deactivateUser($id: String!, $company: String!, $type: String!) {
    deactivateUser(id: $id, company: $company, type: $type) {
      id
    }
  }
`;
