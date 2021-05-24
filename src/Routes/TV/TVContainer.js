import React from "react";
import TVPresenter from "./TVPresenter";
import {tvApi} from "api";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        onAirToday: null,
        loading: true,
        error: null

    };

    async componentDidMount(){
        try {
            const {
                data:{results: topRated}
            } = await tvApi.topRated();
            const {
                data:{results: popular}
            } = await tvApi.popular();
            const {
                data:{results: onAirToday}
            } = await tvApi.onAirToday();
            this.setState({
                topRated,
                popular,
                onAirToday
            })
        } catch {
            this.setState({
                error: "Can't find information about TV."
            })
        } finally {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {topRated, popular, onAirToday, error, loading} = this.state;
        console.log(this.state)
        return (
            <TVPresenter
                topRated={topRated}
                popular={popular}
                onAirToday={onAirToday}
                loading={loading}
                error={error}
            />
        );
    }
}