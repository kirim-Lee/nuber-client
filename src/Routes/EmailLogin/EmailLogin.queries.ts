import {gql} from 'apollo-boost';

export const EMAIL_LOGIN = gql`
    mutation emailLogin($email: String!, $password: String!) {
        EmailSignIn (
            email: $email
            password: $password
        ) {
            ok
            error
            token
        }
    }
`;

