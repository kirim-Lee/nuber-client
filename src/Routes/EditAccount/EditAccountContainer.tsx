import axios from 'axios';
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
    password: string;
    password1: string;
    password2: string;
    password3: string;
    uploading: boolean;
    profilePhoto: string;
    file?: Blob;
}

interface IProps extends RouteComponentProps<any> {}

class UpdateProfileMutation extends Mutation<updateProfile, updateProfileVariables> {}
class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
    public state = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        password1: '',
        password2: '',
        password3: '',
        profilePhoto: '',
        uploading: false
    }
    public render() {
        const {
            email,
            firstName,
            lastName,
            profilePhoto,
            uploading,
            password,
            password1,
            password2,
            password3
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
                            password1,
                            password2,
                            password3,
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
                            uploading={uploading}
                            password = {password}
                            password1 = {password1}
                            password2 = {password2}
                            password3 = {password3}
                            
                        />
                    )}
                    </UpdateProfileMutation>
                )}
            </ProfileQuery>
            
        )
        
    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        const { target : {name, value, files}} = event;
        if (files) {
            this.setState({
                uploading: true
            });
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('api_key', '122282278159188');
            formData.append('upload_preset', 'rmkc4uxz');
            formData.append('timestamp', String(Date.now() / 1000));
            const { data: {secure_url}} = await axios.post('https://api.cloudinary.com/v1_1/rmkc4uxz/image/upload', formData);

            if(secure_url) {
                this.setState({
                    profilePhoto: secure_url,
                    uploading: false
                })
            }
        }
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
                profilePhoto,
                password
            }}} = data as any;
            const {
                email: stateEmail,
                firstName: stateFirstName,
                lastName: stateLastName,
                profilePhoto: stateProfilePhoto,
                password: statePassword
            } = this.state;

            if(stateEmail !== email ||
                stateFirstName !== firstName ||
                stateLastName !== lastName ||
                stateProfilePhoto !== profilePhoto || 
                statePassword !== password
                ) {
                    this.setState({
                        email,
                        firstName,
                        lastName,
                        password,
                        profilePhoto
                    } as any);
                }           
        }
    }

}

export default EditAccountContainer;