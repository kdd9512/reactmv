import React from "react";
import HomePresenter from "./HomePresenter";
import {moviesApi} from "api";
import Error from "Components/Error";

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        try {
            const {
                data:{results: nowPlaying}
            } = await moviesApi.nowPlaying();
            const {
                data:{results: upcoming}
            } = await moviesApi.upcoming();
            const {
                data:{results: popular}
            } = await moviesApi.popular();
            this.setState({
                nowPlaying,
                upcoming,
                popular
            })
        } catch {
            this.setState({
                error: "Can't find information about Movie."
            })
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {nowPlaying, upcoming, popular, error, loading} = this.state;
        console.log(this.state.popular)
        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}