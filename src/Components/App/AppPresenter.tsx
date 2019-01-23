import PropTypes from 'prop-types';
import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch} from 'react-router-dom';
// routes
import AddPlace from '../../Routes/AddPlaces';
import Chat from '../../Routes/Chat';
import EditAccount from '../../Routes/EditAccount';
import EmailLogin from '../../Routes/EmailLogin';
import FindAddress from '../../Routes/FindAddress';
import Home from '../../Routes/Home';
import OutHome from '../../Routes/OutHome';
import PhoneLogin from '../../Routes/PhoneLogin';
import Places from '../../Routes/Places';
import Ride from '../../Routes/Ride';
import Settings from '../../Routes/Settings';
import SocialLogin from '../../Routes/SocialLogin';
import VerifyPhone from '../../Routes/VerifyPhone';


interface IProps {
    isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
    <BrowserRouter>
        {isLoggedIn? 
            <LoggedInRoutes/> : <LoggedOutRoutes /> }
    </BrowserRouter>
);

const LoggedInRoutes: React.SFC = () => (
    <Switch>
        <Route path={"/"} exact={true} component={Home}/>
        <Route path={"/ride/:rideId"} exact={true} component={Ride} />
        <Route path={"/chat/:chatId"} exact={true} component={Chat} />
        <Route path={"/edit-account"} exact={true} component={EditAccount}/>
        <Route path={"/settings"} exact={true} component={Settings}/>
        <Route path={"/places"} exact={true} component={Places}/>
        <Route path={"/add-place"} exact={true} component={AddPlace}/>
        <Route path={"/find-address"} exact={true} component={FindAddress}/>
        <Redirect from={"*"} to={"/"} />
    </Switch>
)

const LoggedOutRoutes: React.SFC = () => (
    <Switch>
        <Route path={"/"} exact={true} component={OutHome}/>
        <Route path={"/phone-login"} exact={true} component={PhoneLogin}/>
        <Route path={"/email-login"} exact={true} component={EmailLogin}/>
        <Route path={"/verify-phone"} exact={true} component={VerifyPhone} />
        <Route path={"/social-login"} exact={true} component={SocialLogin}/>
        <Redirect from={"*"} to={"/"} />
    </Switch>
)

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter;
