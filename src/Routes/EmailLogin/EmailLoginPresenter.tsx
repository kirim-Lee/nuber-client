import React, { ChangeEvent, FormEvent } from 'react';
import Helmet from "react-helmet";
import BackArrow from "src/Components/BackArrow";
import Input from 'src/Components/Input';
import styled from 'src/typed-components';


const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Form = styled.form``;

const Button = styled.button`
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
`;


interface IProps {
    email: string;
    password: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) =>  void;
    onSubmit: (event: FormEvent<HTMLFormElement | HTMLButtonElement>) => void;
}

const EmailLoginPresenter: React.SFC<IProps> = ({
    email,
    password,
    onInputChange,
    onSubmit
}) => (
    <Container>
        <Helmet>
            <title>Email Login | Nuber</title>
        </Helmet>
        <BackArrowExtended backTo={"/"} />
        <Form onSubmit={onSubmit}>
            <Input 
                placeholder={"enter the email"} 
                value={email}
                name={"email"}
                onChange={onInputChange}
            />
            <Input 
                placeholder={"enter the password"} 
                type = {"password"}
                value={password}
                name={"password"}
                onChange={onInputChange}
            />
             <Button onClick={onSubmit}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={"white"}
                >
                <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
                </svg>
            </Button>
        </Form>
    </Container>
);

export default EmailLoginPresenter;