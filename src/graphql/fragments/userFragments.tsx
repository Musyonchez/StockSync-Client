// // Note this is a concept file i liked the idea but did not think necessary to use in this project but have created it so as to rember fo the future 


// userFragments.ts
import { gql } from '@apollo/client';

/**
 * UserFields fragment defines a reusable set of fields for user-related queries.
 * Including these fields in queries helps in maintaining a clean and modular structure.
 */
export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    email
    // Additional user-related fields can be added here
  }
`;
