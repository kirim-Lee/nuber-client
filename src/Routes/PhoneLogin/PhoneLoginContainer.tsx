import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { PHONE_SIGN_IN } from './Phone.queries';
import PhoneLoginPresenter from './PhoneLoginPresenter';

interface IState{
    countryCode: string;
    phoneNumber: string;
}

interface IMutationInterface {
    phoneNumber: string;
}
class PhoneSignInMutation extends Mutation<any, IMutationInterface> {}

class PhoneLoginContainer extends React.Component<
    RouteComponentProps<any>, 
    IState
> {
    public state = {
        countryCode: "+82",
        phoneNumber: ""
    }
    public render(){
        const {countryCode, phoneNumber} = this.state;
        return (
            <PhoneSignInMutation 
                mutation={PHONE_SIGN_IN} 
                variables={{
                    phoneNumber:`${countryCode}${phoneNumber}`
                }}
            >
                {(mutation, {loading}) => {
                    const handleSubmit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = (event) => {        
                        event.preventDefault();
                        const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
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

    
}

export default PhoneLoginContainer;
