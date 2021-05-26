import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
    font-size:15px;
`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    height:180px;
    background-size:cover;
    border-radius: 3px;
    background-position: center center;
    transition:opacity .2s linear;
`;

const Rating = styled.span`
    bottom: 5px;
    right: 5px;
    position: absolute;
    font-size: 12px;
    color: yellow;
    font-weight: bold;
    opacity: 0;
`;

const ImageContainer = styled.div`
    margin-bottom:5px;
    position: relative;
    &:hover {
    ${Image}{
        opacity 0.3
        }
        ${Rating} {
        opacity: 1;
        }
    }
`;

const Title = styled.span`
    display:block;
    font-size:15px;
    margin: 3px 0px 3px;
`;

const Year = styled.span`
    font-size:13px;
    color: rgba(255, 255, 255, 0.5);
`;


const Poster = ({id, imageUrl, title, rating, year, isMovie = false}) => (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ?
                    `https://image.tmdb.org/t/p/w500${imageUrl}`
                    : require("../assets/noImg.png").default
                }/>
                <Rating>
                <span role="img" aria-label="rating">
                    ⭐
                </span>{" "}
                    {rating} / 10
                </Rating>
            </ImageContainer>
            <Title>
                {title.length > 14 ? `${title.substring(0,15)}...` : title}
                {" "}
            </Title>
            <Year>{year}</Year>
        </Container>
    </Link>
);

Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool
};

export default Poster;