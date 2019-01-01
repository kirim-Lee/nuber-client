import React from 'react';
import { graphql, Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { USER_LOG_IN } from 'src/shared.queries';
import { verifyPhone, verifyPhoneVariables } from 'src/types/api';
import { VERIFY_PHONE } from './VerifyPhone.queries';
import VerifyPhonePresenter from './VerifyPhonePresenter';

interface IState {
    verifyKey: string;
    phoneNumber: string;
}
interface IProps extends RouteComponentProps<any> {
    userLogIn: MutationFn
}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
       super(props);
       if (!props.location || !props.location.state) {
           props.history.push("/");
       }
       this.state = {
            phoneNumber: props.location.state.phone,
            verifyKey: ''
       }
    }

    public render() {
        const { verifyKey, phoneNumber } = this.state;
        return (
            <VerifyMutation 
                mutation = { VERIFY_PHONE } 
                variables = {{key: verifyKey, phoneNumber }}
                update = {this.afterCompleted}
            >
            {(mutation, {loading}) => {
                return (
                    <VerifyPhonePresenter 
                        onChange = {this.onInputChange}
                        onSubmit = {mutation}
                        verifyKey = {verifyKey}
                        loading = {loading}
                    />
                )
            }}
            </VerifyMutation>
        );
    }
    
    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        } as any)
    }

    public afterCompleted = (
        cache,
        {data : { CompletePhoneVerification }} :
        {data: verifyPhone }
    ) => {
        if (CompletePhoneVerification.ok) {
            this.props.userLogIn({
                variables: {
                    token: CompletePhoneVerification.token
                }
            });
            toast.success('verified success!');
        } else {
            toast.error(CompletePhoneVerification.error);
        }
    }
}

export default graphql<IProps, any>(USER_LOG_IN,{
    name: "userLogIn"
})(VerifyPhoneContainer);