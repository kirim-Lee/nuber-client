import React from 'react';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import PhoneLoginPresenter from './PhoneLoginPresenter';

interface IState{
    countryCode: string;
    phoneNumber: string;
}

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
            <PhoneLoginPresenter 
                countryCode = { countryCode }
                phoneNumber = { phoneNumber }
                onInputChange = {this.onInputChange}
                handleSubmit = {this.handleSubmit}
            />
        );
    }

    public nofify = (msg: string) => toast(msg);

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        } as any)

    }

    public handleSubmit: React.FormEventHandler<HTMLFormElement | HTMLButtonElement> = (event) => {        
        event.preventDefault();
        const { countryCode, phoneNumber} = this.state;
        const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
        if (isValid) {
            return ;
        } else {
            toast.error('wrong phone number');
        }
        
        // toast.info("Suup");
    }
}

export default PhoneLoginContainer;
