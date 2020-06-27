import React from "react"
import Proptypes from "prop-types"
import styled from "styled-components"
import {Helmet} from "react-helmet"
import Section from "Components/Section"
import Loader from "Components/Loader"
import Message from "Components/Message"
import Poster from "Components/Poster"

const Container = styled.div`
    padding : 20px;
`;

const HomePresenter = ({nowPlaying, popular, upcoming, loading, error}) => 
<>
    <Helmet>
        <title>Movies | Nomflix</title>
    </Helmet>
    {loading ? <Loader/> : (
        <Container>
            
            {nowPlaying && nowPlaying.length > 0 && (
            <Section title = "Now Playing">
                {nowPlaying.map(movie => (
                    //<span key={movie.id}>{movie.title}</span>
                    <Poster 
                        key={movie.id} 
                        id = {movie.id}
                        title = {movie.original_title} 
                        imageUrl = {movie.poster_path}
                        rating = {movie.vote_average}
                        isMovie = {true}
                        year = {movie.release_date.substring(0,4)}
                    />
                ))}
            </Section>
            )}

            {upcoming && upcoming.length > 0 && (
            <Section title = "Upcoming Movie">
                {upcoming.map(movie => (
                    <Poster 
                        key={movie.id} 
                        id = {movie.id}
                        title = {movie.original_title} 
                        imageUrl = {movie.poster_path}
                        rating = {movie.vote_average}
                        isMovie = {true}
                        year = {movie.release_date.substring(0,4)}
                    />
                ))}
            </Section>
            )}

            {popular && popular.length > 0 && (
            <Section title = "Popular Movie">
                {popular.map(movie => (
                    //<span key={movie.id}>{movie.title}</span>
                    <Poster 
                        key={movie.id} 
                        id = {movie.id}
                        title = {movie.original_title} 
                        imageUrl = {movie.poster_path}
                        rating = {movie.vote_average}
                        isMovie = {true}
                        year = {movie.release_date.substring(0,4)}
                    />
                ))}
            </Section>
            )}
            {error && <Message color = "#e74c3c" text={error} />}
        </Container>
        
    )};
</>
HomePresenter.propTypes = {
    nowPlaying : Proptypes.array,
    popular : Proptypes.array,
    upcoming : Proptypes.array,
    loading : Proptypes.bool.isRequired,
    error : Proptypes.string
};

export default HomePresenter;