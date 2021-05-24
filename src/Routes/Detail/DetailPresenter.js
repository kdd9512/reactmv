import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const DetailPresenter = ({result, error, loading}) => null;

DetailPresenter.proptypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string

}

export default DetailPresenter;
