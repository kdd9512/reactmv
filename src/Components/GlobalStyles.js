import {createGlobalStyle} from "styled-components";
import reset from "styled-reset"

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body {
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Canta
        font-size: 14px;
        background-color:rgba(20,20,20,1);
        color:white;
        padding-top: 40px;
    }
`;

export default globalStyles;