// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: String!, $company: String!, $type: String!) {
    user(id: $id, company: $company, type: $type) {
      id
      firstName
      lastName
      email
      store1
      store2
      store3
      store4
      role
      firstRecordAction
      company
      active
    }
  }
`;