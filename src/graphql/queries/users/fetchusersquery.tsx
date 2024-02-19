// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetUsers($company: String!, $type: String!) {
    users(company: $company, type: $type) {
      id
      firstName
      lastName
      age
      email
      store1
      store2
      store3
      store4
      role
    }
  }
`;