import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { GET_PLACES } from 'src/shqred.queries';
import { addPlace, addPlaceVariables } from 'src/types/api';
import { ADD_PLACE } from './AddPlaces.queries';
import AddPlacesPresenter from './AddPlacesPresenter';


interface IState {
    address: string;
    name: string;
    lat: number;
    lng: number;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlaceQuery extends Mutation<addPlace, addPlaceVariables>{}

class AddPlacesContainer extends React.Component<IProps, IState> {
    public state = {
        address: "",
        lat:1.34,
        lng:1.34,
        name: ""
    }
    public render() {
        const {address, name, lat, lng} = this.state;
        const { history } = this.props;
        return (
            <AddPlaceQuery 
                mutation={ADD_PLACE}
                onCompleted = { data => {
                    const {AddPlace} = data;
                    if(AddPlace.ok) {
                        toast.success("Place added");
                        setTimeout(() => {
                            history.push("/places");
                        },2000);
                    } else {
                        toast.error(AddPlace.error);
                    }
                }}
                refetchQueries={[{query: GET_PLACES}]}
                variables={{
                    address, 
                    isFav: false,
                    lat, 
                    lng, 
                    name, 
                }}
            >
            {(addPlaceFn, {loading})=> (
                <AddPlacesPresenter 
                    address={address}
                    name = {name}
                    onInputChange = {this.onInputChange}
                    loading={false} // TODO
                    onSubmit={addPlaceFn}
                />
            )}
            </AddPlaceQuery>
        );
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {target: {name, value}} = event;
        this.setState({
            [name]: value
        } as any);
    }
}

export default AddPlacesContainer;