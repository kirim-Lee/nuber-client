import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from 'src/Components/Header';
import Place from 'src/Components/Place';
import { getPlaces } from 'src/types/api';
import styled from '../../typed-components';

const Container = styled.div`
    padding:0 40px;
`;

const SLink = styled(Link)`
    display: block;
    text-decoration: underline;
    margin: 20px 0;
`;

interface IProps {
    data?: getPlaces;
    loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({data: {GetMyPlaces: {places = null} = {}} = {}, loading}) => (
    <React.Fragment>
        <Helmet>
            <title>Places | Nuber</title>
        </Helmet>
        <Header title={"Places"} backTo={"/"} />
        <Container>
            {!loading && places && !places.length && <SLink to={"/add-place"}>Place add some places!</SLink> }
            {!loading && places && (places.length || '') && (
                places!.map(place => (
                    <Place 
                        key={place!.id} 
                        fav={place!.isFav} 
                        name={place!.name} 
                        address={place!.address} 
                    />
                ))
            )}    
        </Container>
    </React.Fragment>
)

export default PlacesPresenter;