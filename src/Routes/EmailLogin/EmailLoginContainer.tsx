import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { USER_LOG_IN } from 'src/sharedQueries';
import { emailLogin, emailLoginVariables } from 'src/types/api';
import { EMAIL_LOGIN } from './EmailLogin.queries';
import EmailLoginPresenter from './EmailLoginPresenter';

interface IProps extends RouteComponentProps<any>{}

interface IState {
    email: string;
    password: string;
}

class EmailLoginMutation extends Mutation<emailLogin, emailLoginVariables>{}

class EmailLoginContainer extends React.Component<IProps, IState> {
    public EmailLoginFn: MutationFn;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    public render() {
        const {email, password} = this.state;
        return (
            <Mutation mutation = {USER_LOG_IN}>
            {userLogin => (
                <EmailLoginMutation 
                    mutation={EMAIL_LOGIN}
                    variables={{
                        email,
                        password
                    }}
                    update = {(cache, data: any) => { this.afterCompleted(cache, data, userLogin)}}
                >
                    {(EmailLoginFn) => {
                        this.EmailLoginFn = EmailLoginFn;
                        return (  
                            <EmailLoginPresenter 
                                email={email}
                                password={password}
                                onInputChange={this.onInputChange}
                                onSubmit={this.handleEmailLogin}
                            />
                        )
                    }}
                </EmailLoginMutation>
            )}
            </Mutation>
            
        )
    }

    public afterCompleted = (
        cache,
        {data : {EmailSignIn}},
        userLogin: MutationFn
    ) => {
        if (EmailSignIn.ok) {
            userLogin({
                variables: {
                    token: EmailSignIn.token
                }
            });
            toast.success('email signin success!')
        } else {
            toast.error(EmailSignIn.error);
        }
    }

    public handleEmailLogin: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = event => {        
        event.preventDefault();
        this.EmailLoginFn();
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {target: {name, value}} = event;
        this.setState({
            [name]: value
        } as any);
    }
}

export default EmailLoginContainer;