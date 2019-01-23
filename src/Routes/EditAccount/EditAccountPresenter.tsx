import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from "react-helmet";
import Button from 'src/Components/Button';
import Form from 'src/Components/Form';
import Header from 'src/Components/Header';
import Input from 'src/Components/Input';
import PhotoInput from 'src/Components/PhotoInput';
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
    uploading: boolean;
    password: string;
    password1: string;
    password2: string;
    password3: string;
  }

  const EditAccouuntPresenter: React.SFC<IProps> = ({
    firstName,
    lastName,
    email,
    profilePhoto,
    onInputChange,
    onSubmit,
    loading,
    uploading,
    password,
    password1,
    password2,
    password3
  }) => (
      <Container>
            <Helmet>
                <title>Edit Account | Nuber</title>
            </Helmet>
            <Header title={"Edit Account"} backTo={"/"} />
            <ExtendedForm submitFn={onSubmit}>
                <PhotoInput 
                    uploading={uploading}
                    fileUrl={profilePhoto}
                    onChange={onInputChange}
                />
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
                {!password ?
                    <ExtendedInput
                        onChange={onInputChange}
                        type={"password"}
                        value={password1}
                        name = {"password1"}
                        placeholder={"add your password"}
                    /> : (
                        <React.Fragment>
                            <ExtendedInput 
                                onChange = {onInputChange}
                                type={'password'}
                                value={password1}
                                name={"password1"}
                                placeholder={"prev password"}
                            />
                            <ExtendedInput 
                                onChange = {onInputChange}
                                type={'password'}
                                value={password2}
                                name={"password2"}
                                placeholder={"after password"}
                            />
                            <ExtendedInput 
                                onChange = {onInputChange}
                                type={'password'}
                                value={password3}
                                name={"password3"}
                                placeholder={"after password again"}
                            />
                        </React.Fragment>
                    )
                }
                
                <Button onClick={null} value={loading ? "Loading" : "Update"} />
            </ExtendedForm>
      </Container>
  )

  export default EditAccouuntPresenter;