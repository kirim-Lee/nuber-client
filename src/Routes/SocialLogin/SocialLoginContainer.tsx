import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { facebookConnect, facebookConnectVariables } from 'src/types/api';
import { FACEBOOK_CONNECT } from './SocialLogin.queries';
import SocialLoginPresenter from './SocialLoginPresenter';

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IState {
    firstName: string;
    lastName: string;
    email: string;
    fbId: string;
}

interface IProps extends RouteComponentProps<any> {
}

class SocialLoginContainer extends React.Component<IProps, IState> {
    public facebookMutation: MutationFn;

    constructor(props){
        super(props);
        this.state ={
            email: '',
            fbId: '',
            firstName: '',
            lastName: ''
        }
    }
    public render() {
        const { firstName, lastName, email, fbId} = this.state;
        return <LoginMutation 
            mutation={FACEBOOK_CONNECT}
            variables = {{firstName, lastName, email, fbId }}
            >
            {(facebookMutation, {loading}) => { 
                this.facebookMutation = facebookMutation;
                return (
                    <SocialLoginPresenter 
                        loginCallBack={this.callback}
                    />
                )
            }}
        </LoginMutation>
    }
    public callback = (response): any => {
        console.log(response);
        const {name, accessToken, email, userID: fbId, first_name: firstName, last_name: lastName } = response;
        if(accessToken) {
            toast.success(`welcome ${name}!`);
            this.facebookMutation({
                variables:{
                    email,
                    fbId,
                    firstName,
                    lastName
                }
            });
        } else {
            toast.error('Could not log you in :(');
        }
        
    }
}

export default SocialLoginContainer; 