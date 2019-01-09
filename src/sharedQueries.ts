import { gql } from 'apollo-boost';

export const USER_LOG_IN = gql`
    mutation userLogIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;

export const USER_LOG_OUT = gql`
    mutation userLogOut {
        logUserOut @client
    }
`;

// logUserIn --> from apollo.ts
