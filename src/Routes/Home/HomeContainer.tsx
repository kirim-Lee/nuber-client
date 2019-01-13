import React from 'react';
import { Query } from 'react-apollo';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { geoCode } from 'src/mapHelpers';
import { USER_PROFILE } from 'src/shqred.queries';
import { userProfile } from 'src/types/api';
import HomePresenter from './HomePresenter';

interface IState {
    isMenuOpen: boolean;
    lat: number;
    lng: number;
    toAddress: string;
    toLat: number;
    toLng: number;
    distance?: string;
    duration?: string;
    price?: number;
}

interface IProps extends RouteComponentProps<any> {
    google: any;
}

class ProfileQuery extends Query<userProfile>{}

class HomeContainer extends React.Component<IProps, IState>{
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public toMarker: google.maps.Marker;
    public directions: google.maps.DirectionsRenderer;
    public mapRef: any;
    public mapOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    }
    public state = {
        isMenuOpen: false,
        lat: 0,
        lng: 0,
        toAddress: '',
        toLat: 0,
        toLng: 0
    }
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }
    public componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSucces,
            this.handleGeoError,
            this.mapOptions
        )
    }
    public render(){
        const {isMenuOpen, toAddress} = this.state;
        return <ProfileQuery query={USER_PROFILE}>
                {({loading}) => (
                    <HomePresenter 
                        loading = {loading}
                        isMenuOpen = {isMenuOpen}
                        toggleMenu = {this.toggleMenu}
                        mapRef = {this.mapRef}
                        toAddress = {toAddress}
                        onInputChange = {this.onInputChange}
                        onAddressSubmit = {this.onAddressSubmit}
                    />
                )}
                
            </ProfileQuery>
    }

    public toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    public handleGeoSucces = (position: Position) => {
        const {
            coords: {latitude, longitude}
        } = position;
        this.setState({
            lat: latitude,
            lng: longitude
        });
        this.loadMap(latitude, longitude);
    }

    public handleGeoError = () => {
        this.loadMap(37.504606, 127.048962); // 위치 안되면 일단 진행 위해 로드맵 
    } 

    public loadMap = (lat: number, lng: number) => {
        const {google} = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            center: {
                lat,
                lng
            },
            disableDefaultUI: true,
            zoom: 11
        };
        this.map = new maps.Map(mapNode, mapConfig);
        const userMarkerOption: google.maps.MarkerOptions = {
            icon: {
                path: maps.SymbolPath.CIRCLE,
                scale: 7
            },
            position: {lat, lng}
        }
        this.userMarker = new maps.Marker(userMarkerOption);
        this.userMarker.setMap(this.map);
        const watchOptions: PositionOptions = {
            enableHighAccuracy: true
        }
        navigator.geolocation.watchPosition(this.handleGeoWatchSuccess, this.handleGeoWatchError, watchOptions);
    }

    public handleGeoWatchSuccess = (position: Position) => {
        const { coords: {latitude, longitude}} = position;
        this.userMarker.setPosition({lat: latitude, lng: longitude});
        this.map.panTo({lat: latitude, lng: longitude});
    }
    public handleGeoWatchError = () => { 
        console.log('Error watch you');
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) : void => {
        const {target : {name, value}} = event;
        this.setState({
            [name]: value
        } as any);
    }

    public onAddressSubmit: React.ChangeEventHandler<HTMLInputElement> = async () => {
        const {toAddress} = this.state;
        const coords = await geoCode(toAddress);
        const {google} = this.props;
        const maps = google.maps;
        if (coords) {
            const {lat, lng} = coords;
            
            // console.log(lat, lng, coords.formatted_address)
            if (this.toMarker) {
                this.toMarker.setMap(null);
            }
            const toMarkerOptions: google.maps.MarkerOptions = {
                position: {
                    lat,
                    lng
                }
            }
            this.toMarker = new maps.Marker(toMarkerOptions);
            this.toMarker.setMap(this.map);
            const bounds = new maps.LatLngBounds();
            bounds.extend({lat, lng});
            bounds.extend({lat: this.state.lat, lng: this.state.lng});
            this.map.fitBounds(bounds);
            this.setState({
                toAddress: coords.formatted_address,
                toLat: lat,
                toLng: lng
            }, this.createPath)
        }
    }

    public createPath = () => {
        const {toLat, toLng, lat, lng } = this.state;
        if(this.directions) {
            this.directions.setMap(null);
        }
        const renderOptions: google.maps.DirectionsRendererOptions = {
            polylineOptions: {
                strokeColor: "#000"
            },
            suppressMarkers: true
        }
        this.directions = new google.maps.DirectionsRenderer(renderOptions);
        const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
        const to = new google.maps.LatLng(toLat, toLng);
        const from = new google.maps.LatLng(lat, lng);
        const directionsOptions: google.maps.DirectionsRequest = {
            destination: to,
            origin: from,
            travelMode: google.maps.TravelMode.DRIVING
        }
        
        directionsService.route(directionsOptions, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                const {routes} = result;
                const { 
                    distance: {text: distance},
                    duration: {text: duration}
                } = routes[0].legs[0];
                this.setState({
                    distance,
                    duration
                })
                this.directions.setDirections(result);
                this.directions.setMap(this.map);
            } else {
                toast.error("there is no route there..")
            }
        })
    }
}

export default HomeContainer;