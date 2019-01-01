import { gql } from 'apollo-boost';

export const USER_LOG_IN = gql`
    mutation userLogIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;

// logUserIn --> from apollo.ts