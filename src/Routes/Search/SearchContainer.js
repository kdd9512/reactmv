import React from "react";
import SearchPresenter from "./SearchPresenter";
import {moviesApi, tvApi} from "../../api";

export default class extends React.Component {
    state = {
        movieResult: null,
        tvResult: null,
        searchTerm: "",
        loading: false,
        error: null
    };

    handleSubmit = () => {
        const {searchTerm} = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    }

    searchByTerm = async () => {
        const {searchTerm} = this.state;
        this.setState({loading: true});
        try {
            const {
                data: {results: movieResults}
            } = await moviesApi.search(searchTerm);
            const {
                data: {results: tvResults}
            } = await tvApi.search(searchTerm);

            this.setState({
                movieResults,
                tvResults
            });
        } catch {
            this.setState({error: "Can't find results"});
        } finally {
            this.setState({loading: false});
        }
    };


    render() {
        const {movieResult, tvResult, searchTerm, error, loading} = this.state;
        return (
            <SearchPresenter
                movieResult={movieResult}
                tvResult={tvResult}
                error={error}
                loading={loading}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}