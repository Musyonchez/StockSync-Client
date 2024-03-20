// graphql/querys.tsx

import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetUsers($company: String!, $type: String!, $take: Int, $skip: Int) {
    users(company: $company, type: $type, take: $take, skip: $skip) {
      id
      firstName
      lastName
      email
      store1
      store2
      store3
      store4
      role
      active
    }
  }
`;