import React from 'react';
import Helmet from 'react-helmet';
import AddressBar from 'src/Components/AddressBar';
import Button from 'src/Components/Button';
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

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

interface IProps{
    mapRef: any;
    address: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPickPlace: (event: React.MouseEvent<HTMLInputElement>) => void;
}
class FindAddressPresenter extends React.Component<IProps> {
    public render(){
        const {
            address,
            onInputChange,
            onInputBlur,
            onPickPlace,
            mapRef
        } = this.props;
        return (
            <div>
                <Helmet>
                    <title>Finde Address | Nuber</title>
                </Helmet>
                <AddressBar 
                    onBlur={onInputBlur}
                    onChange={onInputChange}
                    name={"address"}
                    value={address}
                />
                <Map ref={mapRef}/>
                <Center>📍</Center>
                <ExtendedButton className={"extended"} value={"Pick this place"} onClick={onPickPlace} />
            </div>
        )
    }
}

export default FindAddressPresenter;