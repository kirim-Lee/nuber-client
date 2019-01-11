import React from 'react';
import { Mutation } from 'react-apollo';
import { GET_PLACES } from 'src/shqred.queries';
import { editPlace, editPlaceVariables } from 'src/types/api';
import { EDIT_PLACE } from './Place.queries';
import PlacePresenter from './PlacePresenter';

interface IProps{
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class FavMutation extends Mutation<editPlace, editPlaceVariables> {}
class PlaceContainer extends React.Component<IProps>{
  public render() {
    const {fav, name, address, id} = this.props;
    return (
      <FavMutation  
        mutation={EDIT_PLACE}
        refetchQueries={[{query: GET_PLACES}]}
        variables={{
          isFav: !fav,
          placeId: id
        }}>
        {(FavMutationFn) => (
          <PlacePresenter 
            fav={fav}
            name={name}
            address={address}
            onStarPress={FavMutationFn}
          />
        )}
        </FavMutation>
    );
  }
}

export default PlaceContainer;