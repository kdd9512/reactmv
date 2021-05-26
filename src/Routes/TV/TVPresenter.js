import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Error from "Components/Error";
import Poster from "../../Components/Poster";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Container = styled.div`
        padding: 40px 20px;
    `;

const TVPresenter = ({topRated, popular, onAirToday, loading, error}) => (
    <HelmetProvider>
        {loading ? (
            <Loader/>
        ) : (
            <Container>
                <Helmet>
                    <title>Shows</title>
                </Helmet>
                {topRated && topRated.length > 0 && (
                    <Section title="Top Rated Shows">
                        {topRated.map(show =>
                            <Poster
                                id={show.id}
                                key={show.id}
                                imageUrl={show.poster_path}
                                title={show.original_name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                                isMovie={false}
                            />
                        )}
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular Shows">
                        {popular.map(show =>
                            <Poster
                                id={show.id}
                                key={show.id}
                                imageUrl={show.poster_path}
                                title={show.original_name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                                isMovie={false}
                            />
                        )}
                    </Section>
                )}
                {onAirToday && onAirToday.length > 0 && (
                    <Section title="On Air NOW">
                        {onAirToday.map(show =>
                            <Poster
                                id={show.id}
                                key={show.id}
                                imageUrl={show.poster_path}
                                title={show.original_name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                                isMovie={false}
                            />
                        )}
                    </Section>
                )}
                {error && <Error text={error}/>}
            </Container>
        )}
    </HelmetProvider>
);


TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    onAirToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string

}


export default TVPresenter;