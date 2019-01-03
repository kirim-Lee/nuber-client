import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { facebookConnect, facebookConnectVariables } from 'src/types/api';
import { FACEBOOK_CONNECT } from './SocialLogin.queries';
import SocialLoginPresenter from './SocialLoginPresenter';

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IState {
    firstName: string;
    lastName: string;
    email?: string;
    fbId: string;
}

interface IProps extends RouteComponentProps<any> {
}

class SocialLoginContainer extends React.Component<IProps, IState> {
    public render() {
        const { firstName, lastName, email, fbId} = this.state;
        return <LoginMutation 
            mutation={FACEBOOK_CONNECT}
            variables = {{firstName, lastName, email, fbId }}
            >
            {(facebookConnect, {loading}) => (
                <SocialLoginPresenter 
                    loginCallBack={facebookConnect}
                />
            )}
        </LoginMutation>
    }
}

export default SocialLoginContainer;