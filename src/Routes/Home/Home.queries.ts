import {gql} from 'apollo-boost';

export const REPORT_LOCATION = gql`
    mutation reportMovement(
        $orientation: Float
        $lastLat: Float
        $lastLng: Float
    ) {
        ReportMovement(
            orientation: $orientation
            lastLat: $lastLat
            lastLng: $lastLng
        ){
            ok
            error
        }
    }
`;