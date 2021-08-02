import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Section from "Components/Section";
import Error from "Components/Error";
import Poster from "Components/Poster";
import {Helmet, HelmetProvider} from "react-helmet-async";
import Loader from "Components/Loader";

const Container = styled.div`
        padding: 40px 20px;
    `;

const HomePresenter = ({nowPlaying, upcoming, popular, loading, error}) => (
    <HelmetProvider>
        {loading ? (
            <Loader/>
        ) : (
            <Container>
                <Helmet>
                    <title>Movies</title>
                </Helmet>
                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing">
                        {nowPlaying.map(movie =>
                            <Poster
                                id={movie.id}
                                key={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.original_title}
                                rating={movie.vote_average}
                                year={movie.release_date
                                    // .substring(0, 4)
                                    }
                                isMovie={true}
                            />)}
                    </Section>
                )}
                {upcoming && upcoming.length > 0 && (
                    <Section title="Upcoming Movies">
                        {upcoming.map(movie =>
                            <Poster
                                id={movie.id}
                                key={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.original_title}
                                rating={movie.vote_average}
                                year={movie.release_date
                                    // .substring(0, 4)
                                }
                                isMovie={true}
                            />)}
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular Movies">
                        {popular.map(movie =>
                            <Poster
                                id={movie.id}
                                key={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.original_title}
                                rating={movie.vote_average}
                                year={movie.release_date
                                    // .substring(0,4)
                                }
                                isMovie={true}
                            />)}
                    </Section>
                )}
                {error && <Error text={error}/>}
            </Container>
        )}
    </HelmetProvider>
);

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default HomePresenter;