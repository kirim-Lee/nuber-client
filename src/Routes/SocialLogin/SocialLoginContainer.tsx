import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { USER_LOG_IN } from 'src/sharedQueries';
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
        return (
            <Mutation mutation={USER_LOG_IN}>
            {userLogin => (
                <LoginMutation 
                    mutation={FACEBOOK_CONNECT}
                    variables = {{firstName, lastName, email, fbId }}
                    update = {(cache, data: any)=>{ this.afterCompleted(cache, data, userLogin)}}
                    >
                    {(facebookMutation, {loading}) => { 
                        this.facebookMutation = facebookMutation;
                        return (
                            <SocialLoginPresenter 
                                loginCallBack={this.callback}
                                loading={loading}
                            />
                        )
                    }}
                </LoginMutation>
            ) }
                
            </Mutation>
            
        )
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
    public afterCompleted = (
        cache,
        {data: {FacebookConnect}} :
        {data: facebookConnect},
        userLogin: MutationFn
    ) => {
        if (FacebookConnect.ok) {
            userLogin({
                variables: {
                    token: FacebookConnect.token
                }
            });
            toast.success('verified success');
        } else {
            toast.error(FacebookConnect.error);
        }
    }
}

export default SocialLoginContainer; 