import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import Header from 'src/Components/Header';
import Place from 'src/Components/Place';
import { getPlaces, userProfile } from 'src/types/api';
import styled from '../../typed-components';

const Container = styled.div`
  padding: 0px 40px;
`;



const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const FakeLink = styled.span`
    text-decoration: underline;
    cursor: pointer;
`;

const SLink = styled(Link)`
    display: block;
    text-decoration: underline;
    margin: 20px 0;
`;

interface IProps {
    userLogOut: MutationFn;
    Profile?: userProfile;
    Places?: getPlaces;
    ProfileLoading: boolean;
    PlacesLoading: boolean;
}
const SettingsPresenter: React.SFC<IProps> = ({
    userLogOut, 
    Profile: {GetMyProfile: {user = null} = {}} = {}, 
    Places: {GetMyPlaces: {places = null} = {}} = {},
    ProfileLoading,
    PlacesLoading
}) => (
    <React.Fragment>
        <Helmet>
            <title>Settings | Nuber</title>
        </Helmet>
        <Header title={"Account Settings"} backTo={"/"} />
        <Container>
            <GridLink to={"/edit-account"}>
                {!ProfileLoading && user && user.profilePhoto && <Image src={user.profilePhoto} />} 
                {!ProfileLoading && user &&
                <Keys>
                    <Key>{user.fullName}</Key>
                    <Key>{user.email}</Key>
                </Keys>
                }
            </GridLink>
            {!PlacesLoading && 
            <React.Fragment>
                {places && (places.length || '') && places.map((place, index) => {
                    return place ? <Place key={index} id={place.id} fav={place.isFav} name={place.name} address={place.address} /> : '';
                })}
            </React.Fragment>
            }
            
            <SLink to={"/places"}>Go to Places</SLink>
            <FakeLink onClick={userLogOut}>Log Out</FakeLink>
        </Container>
    </React.Fragment>
);

export default SettingsPresenter;