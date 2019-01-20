import { SubscribeToMoreOptions } from 'apollo-client';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { USER_PROFILE } from 'src/shqred.queries';
import { getRide, getRideVariables, updateRide, updateRideVariables } from 'src/types/api';
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from './Ride.queries';
import RidePresenter from './RidePresenter';

interface IProps extends RouteComponentProps<any>{}

class RideQuery extends Query<getRide, getRideVariables>{}
class ProfileQuery extends Query{}
class RideUpdate extends Mutation<updateRide, updateRideVariables>{}

class RideContainer extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
        if(!props.match.params.rideId) {
            props.history.push('/');
        }
    }
    public render() {
        const {match: {params: {rideId}}} = this.props;
        return (
            <ProfileQuery query={USER_PROFILE}>
            {({data: userData})=>(
                <RideQuery 
                    query={GET_RIDE} 
                    variables={{rideId: parseFloat(rideId)}}
                    // pollInterval={5000} 
                >
                {({subscribeToMore, data, loading})=>{
                    const subscribeOptions: SubscribeToMoreOptions | any = {
                        document: RIDE_SUBSCRIPTION,
                        updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData.data) {
                                return prev;
                            }
                            const {
                                data: {
                                  RideStatusSubscription: { status }
                                }
                              } = subscriptionData;
                            if (status === "FINISHED") {
                                window.location.href = "/";
                            }
                        }
                    }
                    subscribeToMore(subscribeOptions);
                    return(
                        <RideUpdate 
                            mutation={UPDATE_RIDE_STATUS} 
                            refetchQueries={[{query: GET_RIDE, variables: { rideId: parseFloat(rideId) }}]}
                        >
                        {(updateRideFn)=>(
                            <RidePresenter 
                                data={data}
                                userData={userData}
                                loading={loading}
                                updateRideFn={updateRideFn}
                            />
                        )}
                        </RideUpdate>
                    )
                }}
                </RideQuery>
            )}
            </ProfileQuery>
        )
    }
}

export default RideContainer;