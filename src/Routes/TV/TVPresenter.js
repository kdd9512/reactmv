import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TVPresenter = ({topRated, popular, onAirToday, loading, error}) => null;

TVPresenter.proptypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    onAirToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string

}


export default TVPresenter;