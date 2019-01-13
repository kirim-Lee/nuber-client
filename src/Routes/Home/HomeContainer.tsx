import React from 'react';
import { Query } from 'react-apollo';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { USER_PROFILE } from 'src/shqred.queries';
import { userProfile } from 'src/types/api';
import HomePresenter from './HomePresenter';

interface IState {
    isMenuOpen: boolean;
    lat: number;
    lng: number;
}

interface IProps extends RouteComponentProps<any> {
    google: any;
}

class ProfileQuery extends Query<userProfile>{}

class HomeContainer extends React.Component<IProps, IState>{
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public mapRef: any;
    public mapOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    }
    public state = {
        isMenuOpen: false,
        lat: 0,
        lng: 0
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
        const {isMenuOpen} = this.state;
        return <ProfileQuery query={USER_PROFILE}>
                {({loading}) => (
                    <HomePresenter 
                        loading = {loading}
                        isMenuOpen = {isMenuOpen}
                        toggleMenu = {this.toggleMenu}
                        mapRef = {this.mapRef}
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
}

export default HomeContainer;