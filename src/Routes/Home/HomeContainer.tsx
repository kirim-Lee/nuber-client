import React from 'react';
import { Query } from 'react-apollo';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
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
}

interface IProps extends RouteComponentProps<any> {
    google: any;
}

class ProfileQuery extends Query<userProfile>{}

class HomeContainer extends React.Component<IProps, IState>{
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public toMarker: google.maps.Marker;
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
            minZoom: 8,
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
            this.setState({
                toAddress: coords.formatted_address,
                toLat: coords.lat,
                toLng: coords.lng
            })
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
        }
    }
}

export default HomeContainer;