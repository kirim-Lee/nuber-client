import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { USER_LOG_OUT } from 'src/sharedQueries';
import { USER_PROFILE } from 'src/shqred.queries';
import { userProfile } from 'src/types/api';
import SettingsPresenter from './SettingsPresenter';

class MiniProfileQuery extends Query<userProfile> {}
class SettingsContainer extends React.Component {
    public render(){
        return (
            <Mutation mutation={USER_LOG_OUT}>
                {userLogOut => (
                    <MiniProfileQuery query = {USER_PROFILE}>
                    {({data: Profile, loading: ProfileLoading}) => (
                        <SettingsPresenter 
                            Profile={Profile}
                            userLogOut={userLogOut} 
                            ProfileLoading={ProfileLoading}
                        />
                    )}
                    </MiniProfileQuery>
                    
                )}
            </Mutation>
        )
    }
}

export default SettingsContainer;