import { gql } from "@apollo/client";

export const FIRSTTIMERESET_USER = gql`
  mutation firstTimeResetUser($id: String!, $password: String!, $company: String!, $type: String!) {
    firstTimeResetUser(id: $id, password: $password, company: $company, type: $type) {
      id
    }
  }
`;
