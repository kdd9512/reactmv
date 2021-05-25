import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Section from "Components/Section";

const Container = styled.div`
    padding: 0px 20px;
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
    }) =>
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
                {movieResult && movieResult.length > 0 && (
                    <Section title="Movie Results">{
                        movieResult.map(movie => (
                            <span key={movie.id}>{movie.title}</span>
                        ))}
                    </Section>
                )}
                {tvResult && tvResult.length > 0 && (
                    <Section title="TV Results">{
                        tvResult.map(show => (
                            <span key={show.id}>{show.name}</span>
                        ))}
                    </Section>
                )}
            </>
        )}
    </Container>;

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
