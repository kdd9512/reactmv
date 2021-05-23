import React from "react";
import DetailPresenter from "./DetailPresenter";
import {moviesApi} from "api";
import {tvApi} from "api";

export default class extends React.Component {
    constructor(props) {
        super(props);
        const {
            location: {pathname}
        } = props;
        this.state = {
            result: null,
            loading: true,
            error: null,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: {id}
            },
            history: {push}
        } = this.props;
        const {isMovie} = this.state;
        const parseID = parseInt(id)
        if (isNaN(parseID)) {
            return push("/");
        }
        let result = null;
        try {
            if (isMovie) {
                ({
                    data: result
                } = await moviesApi.movieDetail(parseID));
            } else {
                ({
                    data:result
                }= await tvApi.showDetail(parseID));
            }

        } catch {
            this.setState({error: "Can't find anything..."})
        } finally {
            this.setState({loading: false, result})
        }

    }

    render() {
        const {result, error, loading} = this.state;
        console.log(result)
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}
