import React from 'react';
import ReactDOM from 'react-dom';
import { reverseGeoCode } from 'src/mapHelpers';
import FindAddressPresenter from './FindAddressPresenter';

interface IState {
    lat: number;
    lng: number;
    address: string;
}
class FindAddressContainer extends React.Component<any, IState> {
    public mapRef: any;
    public map: google.maps.Map;
    public mapOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
    }

    constructor(props){
        super(props);
        this.mapRef = React.createRef(); // presenter
        this.state={
            address:'',
            lat:0,
            lng:0
        }
    }
    public componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.handleGeoSucces, this.handleGeoError, this.mapOptions);
    }
    public render(){
        const { address } = this.state; 
        return (
            <FindAddressPresenter 
                mapRef={this.mapRef} 
                address = {address}
                onInputChange = {this.onInputChange}
                onInputBlur = {this.onInputBlur}
            />
        )
    }

    public handleGeoError = (err) => {
        this.loadMap(37.504606, 127.048962); // 위치 안되면 일단 진행 위해 로드맵 
        this.setState({
            address: '',
            lat: 37.504606,
            lng: 127.048962
        });
        return ;
    }

    public handleGeoSucces = (position: Position) => {
        const { coords: {latitude, longitude}} = position;
        this.setState({
            address: '',
            lat: latitude,
            lng: longitude
        });
        this.loadMap(latitude, longitude);
    }

    public loadMap = (lat: number, lng: number) => {
        const { google } = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const mapConfig = google.maps.MapOptions = {
            center: {
                lat,
                lng
            },
            disableDefaultUI: true,
            zoom: 11
        }
        this.map = new maps.Map(mapNode, mapConfig);
        this.map.addListener('dragend', this.handleDragEnd)
    }

    public handleDragEnd = async () => {
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        const reversedAddress = await reverseGeoCode(lat, lng);

        this.setState({
            address: reversedAddress || '',
            lat,
            lng
        } as any);
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        } as any);
    }

    public onInputBlur: React.ChangeEventHandler<HTMLInputElement> = () => {
        console.log("address updated");
    }
}

export default FindAddressContainer;