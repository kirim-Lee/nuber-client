import React from "react";
import { Mutation, Query } from 'react-apollo';
import { USER_PROFILE } from 'src/shqred.queries';
import { toggleDriving, userProfile } from 'src/types/api';
import { TOGGLE_DRIVING } from './Menu.queries';
import MenuPresenter from "./MenuPresenter";

class ProfileQuery extends Query<userProfile> {}
class ToggleDrivingMutation extends Mutation<toggleDriving> {}
class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation 
        mutation = {TOGGLE_DRIVING}
        refetchQueries = {[{query: USER_PROFILE}]}
      >
      {toggleDrivingMode => (
        <ProfileQuery query = {USER_PROFILE}>
          {({data, loading}) => (<MenuPresenter 
            profile = {data}
            loading = { loading }
            toggleDrivingMode = {toggleDrivingMode}
        />)}
        </ProfileQuery>
      )}
      </ToggleDrivingMutation>
    );
  }
}

export default MenuContainer;