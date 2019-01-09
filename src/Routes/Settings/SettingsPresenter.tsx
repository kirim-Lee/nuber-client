import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import Header from 'src/Components/Header';
import Place from 'src/Components/Place';
import { userProfile } from 'src/types/api';
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
    ProfileLoading: boolean;
}
const SettingsPresenter: React.SFC<IProps> = ({userLogOut, Profile: {GetMyProfile: {user = null} = {}} = {}, ProfileLoading}) => (
    <React.Fragment>
        <Helmet>
            <title>Settings | Nuber</title>
        </Helmet>
        <Header title={"Account Settings"} backTo={"/"} />
        <Container>
            <GridLink to={"/edit-account"}>
                {!ProfileLoading && user} 
                <Keys>
                    <Key>Nico</Key>
                    <Key>Home</Key>
                </Keys>
            </GridLink>
            <Place fav={false} name={"Home"} address={"12345"} />
            <Place fav={false} name={"Home"} address={"12345"} />
            <Place fav={false} name={"Home"} address={"12345"} />
            <SLink to={"/places"}>Go to Places</SLink>
            <FakeLink onClick={userLogOut}>Log Out</FakeLink>
        </Container>
    </React.Fragment>
);

export default SettingsPresenter;