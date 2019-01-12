import {GoogleApiWrapper} from 'google-maps-react';
import { MAPS_KEY } from 'src/keys';
import FindAddressContainer from './FindAddressContainer';

export default GoogleApiWrapper({apiKey: MAPS_KEY})(FindAddressContainer);