import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from 'react-sidebar';
import styled from '../../typed-components';
import Menu from '../Menu';

const Container = styled.div``;
interface IProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    loading: boolean;
}
const HomePresenter: React.SFC<IProps> = ({isMenuOpen, toggleMenu, loading}) => (
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
            {!loading && <button onClick={()=> toggleMenu()}>
                Open sidebar
            </button>}
        </Sidebar>

    </Container>
);

export default HomePresenter;