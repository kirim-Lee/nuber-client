import React from 'react';
import Helmet from 'react-helmet';
import Button from 'src/Components/Button';
import Header from 'src/Components/Header';
import Input from 'src/Components/Input';
import styled from 'src/typed-components';

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    key: string;
}
const VerifyPhonePresenter: React.SFC<IProps> = ({ key, onChange }) => (
    <Container>
        <Helmet>
        <title>Verify Phone | Number</title>
        </Helmet>
        <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
        <Form>
            <ExtendedInput
                value={key}
                placeholder={"Enter Verification Code"}
                onChange={onChange}
                name={"key"}
            />
            <Button value={"Submit"} onClick={null} />
        </Form>
    </Container>
);

export default VerifyPhonePresenter;