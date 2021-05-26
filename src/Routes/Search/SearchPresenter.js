import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Error from "Components/Error";
import Poster from "Components/Poster";
import {Helmet, HelmetProvider} from "react-helmet-async";

const Container = styled.div`
    padding: 40px 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width:100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 30px;
    width:100%;
`;


const SearchPresenter = (
    {
        movieResult,
        tvResult,
        loading,
        error,
        searchTerm,
        handleSubmit,
        updateTerm
    }) => (
    <HelmetProvider>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="Search Movies or TV Show"
                       value={searchTerm}
                       onChange={updateTerm}/>
            </Form>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Helmet>
                        <title>Search</title>
                    </Helmet>
                    {movieResult && movieResult.length > 0 && (
                        <Section title="Movie Results">{
                            movieResult.map(movie => (
                                <Poster
                                    id={movie.id}
                                    key={movie.id}
                                    imageUrl={movie.poster_path}
                                    title={movie.original_title}
                                    rating={movie.vote_average}
                                    year={movie.release_date ?
                                        movie.release_date.substring(0, 4) : "NO DATA"}
                                    isMovie={true}
                                />
                            ))}
                        </Section>
                    )}
                    {tvResult && tvResult.length > 0 && (
                        <Section title="TV Results">{
                            tvResult.map(show => (
                                <Poster
                                    id={show.id}
                                    key={show.id}
                                    imageUrl={show.poster_path}
                                    title={show.original_name}
                                    rating={show.vote_average}
                                    year={show.first_air_date ?
                                        show.first_air_date.substring(0, 4) : "NO DATA"}
                                    isMovie={false}
                                />
                            ))}
                        </Section>
                    )}
                    {error && <Error text={error}/>}
                    {tvResult && movieResult
                    && tvResult.length === 0 && tvResult.length === 0
                    && <Error text="NO RESULTS.."/>}
                </>
            )}
        </Container>
    </HelmetProvider>
);

SearchPresenter.propTypes = {
    movieResult: PropTypes.array,
    tvResult: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired
}

export default SearchPresenter;
