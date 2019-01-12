import React from 'react';
import ReactDOM from 'react-dom';
import FindAddressPresenter from './FindAddressPresenter';

interface IState {
    lat: number;
    lng: number;
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
    }
    public componentDidMount(){
        navigator.geolocation.getCurrentPosition(this.handleGeoSucces, this.handleGeoError, this.mapOptions);
    }
    public render(){
        return <FindAddressPresenter mapRef={this.mapRef} />
    }

    public handleGeoError = (err) => {
        this.loadMap(37.504606, 127.048962); // 위치 안되면 일단 진행 위해 로드맵 
        return ;
    }

    public handleGeoSucces = (position: Position) => {
        const { coords: {latitude, longitude}} = position;
        this.setState({
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

    public handleDragEnd = () => {
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();

        console.log(lat, lng)
    }
}

export default FindAddressContainer;