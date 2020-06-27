import React from "react"
import Proptypes from "prop-types"
import styled from "styled-components"
import {Helmet} from "react-helmet"
import Loader from "Components/Loader"
import Section from "Components/Section"
import Message from "Components/Message"
import Poster from "Components/Poster"

const Container = styled.div `
    padding : 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width:100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width:100%;
`;

const SearchPresenter = ({
    movieResults, 
    tvResults, 
    searchTerm, 
    loading, 
    error, 
    handleSubmit, 
    updateTerm
}) => 
<>
    <Helmet>
        <title>Search | Nomflix</title>
    </Helmet>
    <Container>
        
        <Form onSubmit = {handleSubmit}>
            <Input placeholder="Search Movies or TV Shows..." 
                    value={searchTerm} 
                    onChange={updateTerm}
            />
        </Form>
        
        {loading ? <Loader/> : <> 
            {movieResults && movieResults.length > 0 && (
                <Section title="Movie Results">
                    {movieResults.map(movie => 
                        <Poster 
                            key={movie.id} 
                            id = {movie.id}
                            title = {movie.original_title} 
                            imageUrl = {movie.poster_path}
                            rating = {movie.vote_average}
                            isMovie = {true}
                            year = {
                                movie.release_date && movie.release_date.length > 4
                                ? movie.release_date.substring(0,4)
                                : movie.release_date}
                        />  
                    )}
                </Section>
            )}
            {tvResults && tvResults.length > 0 && (
                <Section title="TV Show Results">
                    {tvResults.map(show => 
                        <Poster 
                            key={show.id} 
                            id = {show.id}
                            title = {show.original_name} 
                            imageUrl = {show.poster_path}
                            rating = {show.vote_average}
                            year = {show.first_air_date && show.first_air_date.length > 4 
                                ? show.first_air_date.substring(0,4)
                                : show.first_air_date}
                        />
                    )}
                </Section>
            )}
            {error && <Message color = "#e74c3c" text={error} />}
            {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 &&
                <Message text = "Nothing found" color="#95a5a6" />}
        </>}
    </Container>;
</>

SearchPresenter.propTypes = {
    movieResults : Proptypes.array,
    tvResults : Proptypes.array,
    searchTerm : Proptypes.string,
    loading : Proptypes.bool.isRequired,
    error : Proptypes.string,
    handleSubmit : Proptypes.func.isRequired,
    updateTerm : Proptypes.func.isRequired
};

export default SearchPresenter;