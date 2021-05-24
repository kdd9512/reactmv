import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";

const Container = styled.div`
        padding: 0px 10px
    `;


const TVPresenter = ({topRated, popular, onAirToday, loading, error}) =>
    loading ?
        <Loader/> : (
        <Container>
            {topRated && topRated.length > 0 && (
                <Section title="Top Rated Shows">
                    {topRated.map(show => show.name)}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Shows">
                    {popular.map(show => show.name)}
                </Section>
            )}
            {onAirToday && onAirToday.length > 0 && (
                <Section title="On Air NOW">
                    {onAirToday.map(show => show.name)}
                </Section>
            )}
        </Container>
    );


TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    onAirToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string

}


export default TVPresenter;