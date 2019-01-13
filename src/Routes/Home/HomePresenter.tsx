import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from 'react-sidebar';
import styled from '../../typed-components';
import Menu from '../Menu';

const Container = styled.div``;

const Button = styled.button`
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
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
`;
interface IProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    loading: boolean;
    mapRef: any;
}
const HomePresenter: React.SFC<IProps> = ({isMenuOpen, toggleMenu, loading, mapRef}) => (
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
            {!loading && <Button onClick={()=> toggleMenu()}>|||</Button>}
        </Sidebar>
        <Map ref={mapRef}/>
    </Container>
);

export default HomePresenter;