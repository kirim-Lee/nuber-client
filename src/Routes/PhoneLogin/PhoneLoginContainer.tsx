import { MutationUpdaterFn } from 'apollo-boost';
import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { 
    startPhoneVerification,
    startPhoneVerification_StartPhoneVerification, 
    startPhoneVerificationVariables, 
} from 'src/types/api';
import { PHONE_SIGN_IN } from './Phone.queries';
import PhoneLoginPresenter from './PhoneLoginPresenter';

interface IState{
    countryCode: string;
    phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<startPhoneVerification_StartPhoneVerification, startPhoneVerificationVariables> {}

class PhoneLoginContainer extends React.Component<
    RouteComponentProps<any>, 
    IState
> {
    public state = {
        countryCode: "+82",
        phoneNumber: ""
    }
    public render(){
        // const { history } = this.props;
        const {countryCode, phoneNumber} = this.state;
        return (
            <PhoneSignInMutation 
                mutation={PHONE_SIGN_IN} 
                variables={{
                    phoneNumber:`${countryCode}${phoneNumber}`
                }}
                update={this.afterSubmit}
            >
                {(mutation, {loading}) => {
                    const handleSubmit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = (event) => {        
                        event.preventDefault();
                        const phone = `${countryCode}${phoneNumber}`;
                        const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
                        if (isValid) {
                            mutation();
                        } else {
                            toast.error('wrong phone number');
                        }
                        
                        // toast.info("Suup");
                    }
                    return (
                    <PhoneLoginPresenter 
                        countryCode = { countryCode }
                        phoneNumber = { phoneNumber }
                        onInputChange = {this.onInputChange}
                        handleSubmit = {handleSubmit}
                        loading={loading}
                    />)
                }}
            </PhoneSignInMutation>
        );
    }

    public nofify = (msg: string) => toast(msg);

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        } as any)

    }

    public afterSubmit: MutationUpdaterFn = (
        cache, 
        { data: { StartPhoneVerification } } : 
        { data: startPhoneVerification }
    ) => {
        if (StartPhoneVerification.ok) {
            toast.success("SMS Sent! Redirecting you...");
            const {history} = this.props;
            const {countryCode, phoneNumber} = this.state;
            setTimeout(()=> history.push({
                pathname: '/verify-phone',
                state: {
                   phone: `${countryCode}${phoneNumber}`
                }
            }), 2000);
            

        } else {
            toast.error(StartPhoneVerification.error);
        }
    }

    

    
}

export default PhoneLoginContainer;
