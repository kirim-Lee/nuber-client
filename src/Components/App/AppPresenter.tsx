import PropTypes from 'prop-types';
import React from 'react';

interface IProps {
    isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => isLoggedIn ? <span>you are in</span> : <ul><li><span>your are out</span></li></ul>;

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter;
