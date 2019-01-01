import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from 'react-helmet';
import Button from 'src/Components/Button';
import Form from 'src/Components/Form';
import Header from 'src/Components/Header';
import Input from 'src/Components/Input';
import styled from 'src/typed-components';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: MutationFn;
    verifyKey: string;
    loading: boolean;
}
const VerifyPhonePresenter: React.SFC<IProps> = ({ verifyKey, onChange, onSubmit, loading}) => (
    <Container>
        <Helmet>
        <title>Verify Phone | Number</title>
        </Helmet>
        <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
        <ExtendedForm submitFn = {onSubmit}>
            <ExtendedInput
                value={verifyKey}
                placeholder={"Enter Verification Code"}
                onChange={onChange}
                name={"verifyKey"}
            />
            <Button disabled={loading} value={loading? "Verifying" : "Submit"} onClick={null} />
        </ExtendedForm>
    </Container>
);

export default VerifyPhonePresenter;