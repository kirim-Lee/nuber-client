import {gql} from 'apollo-boost';

export const EDIT_PLACE = gql`
    mutation editPlace(
            $placeId: Int!
            $name: String
            $isFav: Boolean
    ) {
        EditPlace(
            placeId: $placeId
            name: $name
            isFav: $isFav
        )  {
            ok
            error
        }
    }
`;