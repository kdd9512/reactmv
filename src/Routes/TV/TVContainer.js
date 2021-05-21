import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
    state = {
        topRated: null,
        popular: null,
        onAirToday: null,
        loading: true,
        error: null

    };

    render() {
        const {topRated, popular, onAirToday, error, loading} = this.state;
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