import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import ReactPlayer from "react-player";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "CSS/TabStyle.css";

const settings = {
    dots: true,
    speed: 500,
    arrows: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5
}

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter : blur(5px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height:100%;
    border-radius: 4px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 20px;
`;

const Title = styled.span`
    font-size: 35px;
`;

const Item = styled.span`
    line-height: 2.0;
`;

const IMDb = styled.a`
    line-height: 1.5;
`;

const IMDbImg = styled.img`
    margin-bottom: -5px;
    width: 40px;
    height: 20px;
`;

const ItemContainer = styled.div`
    margin-top: 10px;
`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Synop = styled.p`
    margin : 10px 0px 0px 40px;
    font-size : 13px;
    opacity: 0.6;
    line-height: 2;
    width: 70%;
    text-align: center;
`;

const Box = styled.div`
    float:left;
    clear:both;
    display:flex;
`;

const Actor = styled.div`
`;

const Crew = styled.div`
`;

const Info = styled.a`
  float: left;
  margin:0px 15px 20px 15px;
  height:min-content;
  width:min-content;
  justify-content: center;
`;

const Portrait = styled.img`
    clear:both;
    height:180px;
    width:140px;
    border-radius: 4px;
    position: flex;
`;

const StaffInfo = styled.p`
    clear:both;
    color:antiquewhite;
    font-size:15px;
`;
const Etc = styled.span`
  margin: 10px 0px 30px 10px;
  float: left;
  justify-content: center;
  align-items: center;
  width:max-content;
  height:max-content;
`;


const DetailPresenter = ({result, credits, error, loading}) => (
    loading ? (
        <HelmetProvider>
            <Helmet>
                <title>Loading...</title>
            </Helmet>
            <Loader/>
        </HelmetProvider>
    ) : (
        <HelmetProvider>
            <Container>
                <Helmet>
                    <title>{result.original_title
                        ? `${result.original_title}`
                        : result.original_name}
                    </title>
                </Helmet>
                <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                />
                <Content>
                    <Cover
                        bgImage={result.poster_path ?
                            `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require("assets/noImg.png").default}
                    />
                    <Data>
                        <Title>{result.original_title
                            ? result.original_title
                            : result.original_name}
                        </Title>
                        <ItemContainer>
                            <Item>{result.release_date
                                ? result.release_date.substring(0, 4)
                                : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>・</Divider>
                            <Item>{result.runtime
                                ? `${result.runtime} min`
                                : `${result.episode_runtime} min`}
                            </Item>
                            <Divider>・</Divider>
                            <Item>{result.genres
                            && result.genres.map((genre, index) =>
                                index === result.genres.length - 1
                                    ? genre.name
                                    : `${genre.name} / `
                            )}
                            </Item>
                            <Divider>{""}</Divider>
                            {result.imdb_id ? (
                                    <IMDb href={`https://www.imdb.com/title/${result.imdb_id}`} target={"_blank"}>
                                        <IMDbImg
                                            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/220px-IMDB_Logo_2016.svg.png"}/>
                                    </IMDb>
                                )
                                : null}
                        </ItemContainer>
                        <>
                            <Tabs defaultFocus={0} className="tabContainer">
                                <TabList className="tabList">
                                    <Tab className="tabMenu" eventKey={0}>synopsis</Tab>
                                    <Tab className="tabMenu" eventKey={1}>trailer</Tab>
                                    <Tab className="tabMenu" eventKey={2}>staff</Tab>
                                </TabList>
                                <TabPanel className="tabContent" eventKey={0}>
                                    <Synop>{result.overview}</Synop>
                                </TabPanel>
                                <TabPanel className="tabContent" eventKey={1}>
                                    <ReactPlayer
                                        width="730px"
                                        height="460px"
                                        url={`https://www.youtube.com/watch?v=${result.videos.results[0].key}`}/>
                                </TabPanel>
                                <TabPanel className="tabContent" eventKey={2}>
                                    <Box>
                                        <Actor>
                                            {credits.cast && credits.cast.length > 0
                                                ? credits.cast.map((actor, index) =>
                                                    index < 4 ? (
                                                        <Info>
                                                            <Portrait
                                                                src={actor.profile_path ?
                                                                    `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                                                                    : require("assets/noImg.png").default}
                                                            />
                                                            <StaffInfo>
                                                                {actor.original_name}
                                                            </StaffInfo>
                                                            <StaffInfo>
                                                                {`Star as ${actor.character}`}
                                                            </StaffInfo>
                                                        </Info>
                                                    ) : null
                                                )
                                                : "Not found information"}
                                            {credits.cast.length > 4 ? (
                                                <Etc>
                                                    + {credits.cast.length - 4} Actors...
                                                </Etc>
                                            ) : null}
                                        </Actor>

                                    </Box>
                                    <Box>
                                        <Crew>
                                            {credits.crew && credits.crew.length > 0
                                                ? credits.crew.map((crew, index) =>
                                                    index < 4 ? (
                                                        <Info>
                                                            <Portrait
                                                                src={crew.profile_path ?
                                                                    `https://image.tmdb.org/t/p/original/${crew.profile_path}`
                                                                    : require("assets/noImg.png").default}
                                                            />
                                                            <StaffInfo>
                                                                {crew.original_name}
                                                            </StaffInfo>
                                                            <StaffInfo>
                                                                {`Role as ${crew.job}`}
                                                            </StaffInfo>
                                                        </Info>
                                                    ) : null
                                                )
                                                : "Not found information"}
                                            {credits.crew.length > 4 ? (
                                                <Etc>
                                                    + {credits.crew.length - 4} Crews...
                                                </Etc>
                                            ) : null}
                                        </Crew>

                                    </Box>
                                </TabPanel>
                            </Tabs>
                        </>
                    </Data>
                </Content>
            </Container>
        </HelmetProvider>
    )
);


DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailPresenter;
