import reset from 'styled-reset';
import { createGlobalStyle } from './typed-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
    ${reset}
    * {
        box-sizing: border-box;
    }
    body{
        font-family: 'Maven Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    a{
        color:inherit;
        text-decoration:none;
    }
    input,
    button{
        &:focus,
        &:active{outline:none}
    }
`;

export default GlobalStyle;