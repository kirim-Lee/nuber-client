import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from "react-helmet";
import Button from 'src/Components/Button';
import Form from 'src/Components/Form';
import Header from 'src/Components/Header';
import Input from 'src/Components/Input';
import styled from "src/typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: MutationFn;
    loading: boolean;
  }

  const EditAccouuntPresenter: React.SFC<IProps> = ({
    firstName,
    lastName,
    email,
    profilePhoto,
    onInputChange,
    onSubmit,
    loading
  }) => (
      <Container>
            <Helmet>
                <title>Edit Account | Nuber</title>
            </Helmet>
            <Header title={"Edit Account"} backTo={"/"} />
            <ExtendedForm submitFn={onSubmit}>
                <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={firstName}
                    name = {"firstName"}
                    placeholder={"First name"}
                />
                <ExtendedInput
                    onChange={onInputChange}
                    type={"text"}
                    value={lastName}
                    name = {"lastName"}
                    placeholder={"Last name"}
                />
                <ExtendedInput
                    onChange={onInputChange}
                    type={"email"}
                    value={email}
                    name = {"email"}
                    placeholder={"Email"}
                />
                <Button onClick={null} value={loading ? "Loading" : "Update"} />
            </ExtendedForm>
      </Container>
  )

  export default EditAccouuntPresenter;