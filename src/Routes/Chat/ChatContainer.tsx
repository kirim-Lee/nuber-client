import { SubscribeToMoreOptions } from 'apollo-client';
import React from 'react';
import { Mutation, MutationFn, Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { USER_PROFILE } from 'src/shqred.queries';
import { 
    getChat, 
    getChatVariables, 
    sendMessage, 
    sendMessageVariables,
    userProfile
 } from 'src/types/api';
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './Chat.queries';
import ChatPresenter from './ChatPresenter';

interface IProps extends RouteComponentProps<any> {}
interface IState {
    message: string;
}

class ProfileQuery extends Query<userProfile>{}
class ChatQuery extends Query<getChat, getChatVariables>{}
class SendMessageMutation extends Mutation<sendMessage, sendMessageVariables>{}

class ChatContainer extends React.Component<IProps, IState> {
    public sendMessageFn: MutationFn;
    constructor(props: IProps) {
        super(props);
        if (!props.match.params.chatId) {
            props.history.push('/');
        }
        this.state = {
            message: ""
        }
    }
    public render() {
        const {match: {params: {chatId}}} = this.props;
        const {message} = this.state;
        return (
            <ProfileQuery query={USER_PROFILE}>
                {({data: userData}) => (
                    <ChatQuery 
                        query={GET_CHAT}
                        variables={{chatId: parseFloat(chatId)}}
                    >
                        {({subscribeToMore, data, loading})=>{
                            const messageSubscriptionOption: SubscribeToMoreOptions = {
                                document: SUBSCRIBE_TO_MESSAGES,                         updateQuery: (prev,{subscriptionData}) => {
                                    if (!subscriptionData.data || !prev.GetChat ||
                                        prev.GetChat.chat.messages[prev.GetChat.chat.messages.length-1].id === subscriptionData.data.MessageSubscription.id
                                        ) {
                                        return prev;
                                    } else {
                                        return Object.assign({}, prev, {
                                            GetChat: {
                                                ...prev.GetChat,
                                                chat: {
                                                    ...prev.GetChat.chat,
                                                    messages: [
                                                        ...prev.GetChat.chat.messages,
                                                        subscriptionData.data.MessageSubscription
                                                    ]
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                            subscribeToMore(messageSubscriptionOption);
                            return (
                                <SendMessageMutation 
                                    mutation={SEND_MESSAGE}
                                >
                                    {(sendMessageFn) => {
                                        this.sendMessageFn = sendMessageFn;
                                        return (
                                            <ChatPresenter 
                                                data={data}
                                                loading={loading}
                                                userData={userData}
                                                messageText={message}
                                                onInputChange = {this.onInputChange}
                                                onSubmit={this.onSubmit}
                                            />
                                        )
                                    }}
                                </SendMessageMutation>
                            )
                        }}
                    </ChatQuery>

                )}
            </ProfileQuery>
        )
    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const {
            target: {name, value}
        } = event;
        this.setState({
            [name] : value
        } as any)
    }
    public onSubmit: React.FormEventHandler = event => {
        event.preventDefault();
        const {match: {params: {chatId}}} = this.props;
        const { message } = this.state;
        if (message) {
            this.setState({
                message: ""
            })
            this.sendMessageFn({
                variables: {
                    chatId: parseFloat(chatId),
                    text: message
                }
            })
        }
    }
}

export default ChatContainer;