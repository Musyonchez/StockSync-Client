import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!, $company: String!, $type: String!) {
    deleteUser(id: $id, company: $company, type: $type) {
      id
    }
  }
`;
