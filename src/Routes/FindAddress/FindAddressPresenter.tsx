import React from 'react';
import Helmet from 'react-helmet';
import styled from 'src/typed-components';

const Map = styled.div`
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
`;

const Center = styled.div`
    position: absolute;
    z-index:2;
    width:40px;
    height:40px;
    font-size:30px;
    margin:auto;
    top:0; 
    left:0;
    right:0;
    bottom:0;
`;


interface IProps{
    mapRef: any;
}
class FindAddressPresenter extends React.Component<IProps> {
    public render(){
        return (
            <div>
                <Helmet>
                    <title>Finde Address | Nuber</title>
                </Helmet>
                <Map ref={this.props.mapRef}/>
                <Center>📍</Center>
            </div>
        )
    }
}

export default FindAddressPresenter;