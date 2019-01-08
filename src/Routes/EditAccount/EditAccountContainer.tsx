import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';
import { USER_PROFILE } from 'src/shqred.queries';
import { updateProfile, updateProfileVariables, userProfile } from 'src/types/api';
import { UPDATE_PROFILE } from './EditAccount.queries';
import EditAccountPresenter from './EditAccountPresenter';


interface IState {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<updateProfile, updateProfileVariables> {}
class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
    public state = {
        email: '',
        firstName: '',
        lastName: '',
        profilePhoto: ''
    }
    public render() {
        const {
            email,
            firstName,
            lastName,
            profilePhoto
        } = this.state;
        
        return (
            <ProfileQuery 
                query={USER_PROFILE} 
                fetchPolicy={"cache-and-network"} // 페이지 진입시 캐시 이용하지 않고 api 호출하도록 하는 옵션
                onCompleted={this.updateFields}
            >
                {() => (
                    <UpdateProfileMutation 
                        mutation = {UPDATE_PROFILE} 
                        refetchQueries = {[{query: USER_PROFILE}]}
                        onCompleted = {data => {
                            const {UpdateMyProfile} = data;
                            if(UpdateMyProfile.ok ){
                                toast.success('Profile Updated!');
                            } else {
                                toast.error(UpdateMyProfile.error);
                            }
                        }}
                        variables = {{
                            email,
                            firstName,
                            lastName,
                            profilePhoto
                        }}
                    >
                    {(updateProfileFn, {loading}) => (
                        <EditAccountPresenter 
                            email={email}
                            firstName={firstName}
                            lastName={lastName}
                            profilePhoto={profilePhoto}
                            onInputChange = {this.onInputChange}
                            loading = {false}
                            onSubmit = {updateProfileFn}
                        />
                    )}
                    </UpdateProfileMutation>
                )}
            </ProfileQuery>
            
        )
        
    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const { target : {name, value}} = event;
        this.setState({
            [name]: value
        } as any);
    }

    public updateFields = (data: userProfile | {}) => {
        if("GetMyProfile" in data) {
            const {GetMyProfile: { user: {
                email,
                firstName,
                lastName,
                profilePhoto
            }}} = data as any;
            const {
                email: stateEmail,
                firstName: stateFirstName,
                lastName: stateLastName,
                profilePhoto: stateProfilePhoto
            } = this.state;

            if(stateEmail !== email &&
                stateFirstName !== firstName &&
                stateLastName !== lastName &&
                stateProfilePhoto !== profilePhoto
                ) {
                    this.setState({
                        email,
                        firstName,
                        lastName,
                        profilePhoto
                    } as any);
                }           
        }
    }
}

export default EditAccountContainer;