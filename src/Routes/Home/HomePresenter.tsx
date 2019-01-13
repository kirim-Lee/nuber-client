import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from 'react-sidebar';
import AddressBar from 'src/Components/AddressBar';
import Button from 'src/Components/Button';
import styled from '../../typed-components';
import Menu from '../Menu';

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
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

const RequestButton = styled(ExtendedButton)`
    bottom: 100px;
    background-color:red;
`;

interface IProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    loading: boolean;
    mapRef: any;
    toAddress: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddressSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
    price: number;
}
const HomePresenter: React.SFC<IProps> = ({
    isMenuOpen, 
    toggleMenu, 
    loading, 
    mapRef,
    toAddress,
    onInputChange,
    onAddressSubmit,
    price
}) => (
    <Container>
        <Helmet>Home | Nuber</Helmet>
        <Sidebar
            sidebar={<Menu />}
            open = {isMenuOpen}
            onSetOpen = {toggleMenu}
            styles ={{sidebar: {
                background:'white',
                width: '80%',
                zIndex: '10',
            }}}
        >
            {!loading && <MenuButton onClick={()=> toggleMenu()}>|||</MenuButton>}
        </Sidebar>
        <Map ref={mapRef}/>
        <AddressBar
            name={"toAddress"}
            onChange={onInputChange}
            value={toAddress}
            onBlur={()=> null}
        />    
        {price ? (
            <RequestButton
                onClick={onAddressSubmit}
                disabled={toAddress === ""}
                value={`Request Ride ($${price})`}
            />
        ) : "" }
        <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={price? "Change Address" :"Pick Address"}
        />
    </Container>
);

export default HomePresenter;