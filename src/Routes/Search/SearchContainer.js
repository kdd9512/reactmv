import React from "react";
import SearchPresenter from "./SearchPresenter";
import {moviesApi, tvApi} from "api";
import Error from "Components/Error";

export default class extends React.Component {
    state = {
        movieResult: null,
        tvResult: null,
        searchTerm: "",
        loading: false,
        error: null
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if (searchTerm !== "") {
            this.searchByTerm();
        }
    }

    updateTerm = (event) => {
        const {target: {value}} = event;
        this.setState(
            {searchTerm: value}
        );
    }

    searchByTerm = async () => {
        const {searchTerm} = this.state;
        this.setState({loading: true});
        try {
            const {
                data: {results: movieResult}
            } = await moviesApi.search(searchTerm);
            const {
                data: {results: tvResult}
            } = await tvApi.search(searchTerm);

            this.setState({
                movieResult,
                tvResult
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
                updateTerm={this.updateTerm}
            />
        );
    }
}