import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { USER_LOG_OUT } from 'src/sharedQueries';
import { GET_PLACES, USER_PROFILE } from 'src/shqred.queries';
import { getPlaces, userProfile  } from 'src/types/api';
import SettingsPresenter from './SettingsPresenter';

class MiniProfileQuery extends Query<userProfile> {}
class PlaceQuery extends Query<getPlaces> {}

class SettingsContainer extends React.Component {
    public render(){
        return (
            <Mutation mutation={USER_LOG_OUT}>
                {userLogOut => (
                    <MiniProfileQuery query = {USER_PROFILE}>
                    {({data: Profile, loading: ProfileLoading}) => (
                        <PlaceQuery query = {GET_PLACES} >
                        {({data: Places, loading: PlacesLoading}) => (
                            <SettingsPresenter 
                                Profile={Profile}
                                Places={Places}
                                userLogOut={userLogOut} 
                                ProfileLoading={ProfileLoading}
                                PlacesLoading={PlacesLoading}
                            />
                        )}
                        </PlaceQuery>
                        
                    )}
                    </MiniProfileQuery>
                    
                )}
            </Mutation>
        )
    }
}

export default SettingsContainer;