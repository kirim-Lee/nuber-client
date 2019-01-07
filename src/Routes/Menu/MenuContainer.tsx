import React from "react";
import { Mutation, Query } from 'react-apollo';
import { toast } from 'react-toastify';
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
        // refetchQueries = {[{query: USER_PROFILE}]} 서버로 직접 수정하는 방법
        // 캐시를 이용해서 수정하는 방법
        update={(cache, {data}) => {
          if (data) {
            const {ToggleDrivingMode} = data;
            if(!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return ;
            }
            const query: userProfile | null = cache.readQuery({query: USER_PROFILE}); 
            // 캐시된 데이터 수정
            if (query && query.GetMyProfile && query.GetMyProfile.user) {
              query.GetMyProfile.user!.isDriving = !query.GetMyProfile.user.isDriving;
            }
            cache.writeQuery({query: USER_PROFILE, data: query});
          }
        }}
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