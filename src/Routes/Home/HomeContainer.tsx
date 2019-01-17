import { SubscribeToMoreOptions } from 'apollo-client';
import React from 'react';
import { graphql, Mutation, MutationFn, Query } from 'react-apollo';
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { geoCode, reverseGeoCode } from 'src/mapHelpers';
import { USER_PROFILE } from 'src/shqred.queries';
import { 
    acceptRide,
    acceptRideVariables,
    getNearByDrivers, 
    getRides, 
    reportMovement, 
    reportMovementVariables, 
    requestRide,
    requestRideVariables,
    userProfile,
} from 'src/types/api';
import { 
    ACCEPT_RIDE,
    GET_NEARBY_DRIVERS, 
    GET_NEARBY_RIDE,
    REPORT_LOCATION, 
    REQUEST_RIDE,
    SUBSCRIBE_NEARBY_RIDES,
} from './Home.queries';
import HomePresenter from './HomePresenter';


interface IState {
    isMenuOpen: boolean;
    lat: number;
    lng: number;
    fromAddress: string;
    toAddress: string;
    toLat: number;
    toLng: number;
    distance?: number;
    duration?: number;
    price?: number;
    isDriving: boolean;
}

interface IProps extends RouteComponentProps<any> {
    google: any;
    reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile>{}
class NearbyQueries extends Query<getNearByDrivers>{}
class RequestRideMutation extends Mutation<requestRide, requestRideVariables>{}
class GetNearByRides extends Query<getRides>{}
class AcceptRide extends Mutation<acceptRide, acceptRideVariables>{}

class HomeContainer extends React.Component<IProps, IState>{
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public toMarker: google.maps.Marker;
    public drivers: google.maps.Marker[] = [];
    public directions: google.maps.DirectionsRenderer;
    public mapRef: any;
    public mapOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    }
    public state = {
        distance: 0,
        duration: 0,
        fromAddress: '',
        isDriving: false,
        isMenuOpen: false,
        lat: 0,
        lng: 0,
        price: 0, 
        toAddress: '',
        toLat: 0,
        toLng: 0,
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
        const {
            isMenuOpen, 
            toAddress, 
            price, 
            fromAddress, 
            lat, 
            lng, 
            toLat, 
            toLng, 
            distance, 
            duration, 
            isDriving,
        } = this.state;
        return (
                <ProfileQuery 
                query={USER_PROFILE}
                onCompleted = {this.handleProfileQuery}
            >
                {({data, loading}) => (
                    
                    <NearbyQueries 
                        query={GET_NEARBY_DRIVERS} 
                        skip={isDriving}
                        pollInterval={5000} // 5초마다 다시 요청 하는데 refetch와 다름 업데이트가 있을때만 onCompleted를 호출한다.
                        onCompleted={this.handleNearbyDrivers}
                    >
                        {() => (
                            <RequestRideMutation 
                                mutation={REQUEST_RIDE} 
                                onCompleted={this.handleRideRequest}
                                variables={{
                                    distance: distance.toString(),
                                    dropOffAddress: toAddress,
                                    dropOffLat: toLat,
                                    dropOffLng: toLng,
                                    duration: duration.toString(),
                                    pickUpAddress: fromAddress,
                                    pickUpLat: lat,
                                    pickUpLng: lng,
                                    price
                                }}
                            >
                            {(requestRideFn) => (
                                <GetNearByRides query={GET_NEARBY_RIDE} skip={!isDriving}>
                                {({subscribeToMore, data: nearbyRide}) => {
                                    const rideSubscriptionOptions: SubscribeToMoreOptions = {
                                        document: SUBSCRIBE_NEARBY_RIDES,
                                        updateQuery:  (prev, { subscriptionData }) => {
                                            if (!subscriptionData.data) {
                                                return prev;
                                            }
                                            console.log(prev);
                                            console.log("ee", subscriptionData);
                                            const newObject = Object.assign({}, prev, {
                                                GetNearByRide: {
                                                    ...prev.GetNearByRide,
                                                    ride: subscriptionData.data.NearbyRideSubscription
                                                }
                                            });
                                            console.log(newObject)
                                            return newObject;
                                        }
                                    }
                                    if (isDriving) {
                                        subscribeToMore(rideSubscriptionOptions);
                                    }
                                    return (
                                        <AcceptRide mutation={ACCEPT_RIDE}>
                                        {(acceptRideFn) => (
                                            <HomePresenter 
                                                loading = {loading}
                                                isMenuOpen = {isMenuOpen}
                                                toggleMenu = {this.toggleMenu}
                                                mapRef = {this.mapRef}
                                                toAddress = {toAddress}
                                                onInputChange = {this.onInputChange}
                                                onAddressSubmit = {this.onAddressSubmit}
                                                requestRideFn= {requestRideFn}
                                                price ={ price }
                                                data = {data}
                                                nearbyRide={nearbyRide}
                                                acceptRideFn={acceptRideFn}
                                        />
                                        )}
                                        </AcceptRide>
                                        
                                    );
                                }}
                                </GetNearByRides>
                            )}
                            </RequestRideMutation>
                            
                        )}
                    </NearbyQueries>
                    
                )}
                
            </ProfileQuery>
        )
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
        this.getFromAddress(latitude, longitude);
        this.loadMap(latitude, longitude);
    }

    public getFromAddress = async (lat: number, lng: number) => {
        const address = await reverseGeoCode(lat, lng);
        if (address) {
            this.setState({
                fromAddress: address
            })
        }
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
        const {reportLocation} = this.props;
        const { coords: {latitude, longitude}} = position;
        this.userMarker.setPosition({lat: latitude, lng: longitude});
        this.map.panTo({lat: latitude, lng: longitude});

        reportLocation({
            variables: {
                lastLat: latitude,
                lastLng: longitude
            }
        })
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
        
        directionsService.route(directionsOptions, this.handleRouteRequest);
    }

    public handleRouteRequest = (
        result: google.maps.DirectionsResult, 
        status: google.maps.DirectionsStatus
    ) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const {routes} = result;
            console.log(routes);
            const { 
                distance: {value: distance},
                duration: {value: duration}
            } = routes[0].legs[0];
            this.directions.setDirections(result);
            this.directions.setMap(this.map);
            this.setState({
                distance,
                duration
            }, this.setPrice);
        } else {
            toast.error("there is no route there..")
        }
    }

    public setPrice = () => {
        const { distance } = this.state;
        if (distance) {
            this.setState({
                price: Math.floor(distance/1000) * 3
            })
        }
    }

    public handleNearbyDrivers = ( data: {} | getNearByDrivers) => {
        if ("GetNearByDrivers" in data) {
            const {GetNearByDrivers: {drivers, ok}} = data;
            if(ok && drivers) {
                drivers.map(driver => {
                    if(driver && driver.lastLat && driver.lastLng){
                        const existingDriver: google.maps.Marker | undefined = this.drivers.find((driverMarker: google.maps.Marker): boolean => {
                            return driverMarker.get('ID') === driver.id;
                        });

                        if (existingDriver) {
                            // 추가된 드라이버가 있을 경우 
                            existingDriver.setPosition({
                                lat: driver.lastLat,
                                lng: driver.lastLng
                            });
                            existingDriver.setMap(this.map);
                        } else {
                            // 추가된 드라이버가 없을경우
                            const markerOptions: google.maps.MarkerOptions = {
                                icon: {
                                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                    scale: 5,
                                    strokeColor: 'orange'
                                },
                                position: {
                                    lat: driver.lastLat,
                                    lng: driver.lastLng
                                }
                            }
                            const newMarker: google.maps.Marker = new google.maps.Marker(markerOptions);
                            newMarker.set('ID', driver.id); // 아이디 추적을 위해 꼭 적어줘야 함
                            newMarker.setMap(this.map);
                            this.drivers.push(newMarker);
                        }
                        
                    }
                });
            }
        }
    }
    public handleRideRequest = (data: requestRide) => {
        const {RequestRide} = data;
        if(RequestRide.ok) {
            toast.success("Drive requested, finding a driver");
        } else {
            toast.error(RequestRide.error);
        }
    }

    public handleProfileQuery = (data: userProfile) => {
        const {GetMyProfile} = data;
        if (GetMyProfile.user) {
            const {isDriving} = GetMyProfile.user;
            if(isDriving && !this.state.isDriving) {
                this.setState({
                    isDriving: true
                })
            }
        }
    }

}

export default graphql<any, reportMovement, reportMovementVariables>(
    REPORT_LOCATION, 
    {
        name: "reportLocation"
    }
)(HomeContainer);