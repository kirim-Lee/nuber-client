import React from 'react';
import styled from 'src/typed-components';

const Container = styled<{mine: boolean}, any>("div")`
    background-color: ${props => props.mine ? props.theme.blueColor: props.theme.greyColor};
    color: white;
    padding: 15px 15px;
    border-radius: 30px;
    align-self: ${props => props.mine ? 'flex-end': 'flex-start'};
    border-bottom-right-radius: ${props => props.mine ? 0: '20px'};
    border-bottom-left-radius: ${props => props.mine ? '20px': 0 };
`;

interface IProps{
    text: string;
    mine: boolean;
}

const Message: React.SFC<IProps> = ({text, mine}) => (
    <Container mine={mine}>{text}</Container>
);

export default Message;