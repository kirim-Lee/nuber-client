import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from 'src/Components/Button';
import Form from 'src/Components/Form';
import Header from 'src/Components/Header';
import Input from 'src/Components/Input';
import styled from '../../typed-components';

const Container = styled.div`
    padding:0 40px;
`;

const ExtendedInput = styled(Input)`
    margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
    text-decoration: underline;
    margin-bottom: 20px;
    display: block;
`;

interface IProps {
    address: string;
    name: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    onSubmit: MutationFn;
    pickedAddress: boolean;
}

const AddPlacesPresenter: React.SFC<IProps> = ({name, address, onInputChange, loading, onSubmit, pickedAddress}) => (
    <React.Fragment>
        <Helmet>
            <title>AddPlaces | Nuber</title>
        </Helmet>
        <Header title={"AddPlaces"} backTo={"/"} />
        <Container>
            <Form submitFn={onSubmit}>
                <ExtendedInput 
                    type={"text"} 
                    name={'name'} 
                    placeholder={'Name'} 
                    value={name} 
                    onChange={onInputChange}/>
                <ExtendedInput 
                    type={"text"} 
                    name={'address'} 
                    placeholder={'Address'} 
                    value={address} 
                    onChange={onInputChange} />
                <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
                {pickedAddress && <Button value={loading ? "Adding Place" : "Add Place"} onClick={null}/>}
            </Form>
        </Container>
    </React.Fragment>
)

export default AddPlacesPresenter;