import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width:100vw;
    display:flex;
    justify-content:center;
`;

const Text = styled.span`
    color: blue;
    font-weight:bold;
`;

const Error = ({text}) => (
    <Container>
        <Text>{text}</Text>
    </Container>
);

Error.propTypes = {
    text: PropTypes.string.isRequired
};

export default Error;