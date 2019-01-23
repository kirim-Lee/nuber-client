import {gql} from 'apollo-boost';

export const UPDATE_PROFILE = gql`
    mutation updateProfile(
        $firstName: String!, 
        $lastName: String!, 
        $email: String!, 
        $profilePhoto: String,
        $password1: String,
        $password2: String,
        $password3: String
        ) {
            UpdateMyProfile(
                firstName: $firstName
                lastName: $lastName
                email: $email
                profilePhoto: $profilePhoto
                password1: $password1
                password2: $password2
                password3: $password3
            ){
                ok
                error
            }
    }
`;