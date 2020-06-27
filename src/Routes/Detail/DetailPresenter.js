import React from "react"
import Proptypes from "prop-types"
import styled from "styled-components"
import {Helmet} from "react-helmet"
import Loader from "Components/Loader"
import Background from "../../assets/imdb.png"
import YouTube from '@u-wave/react-youtube';

const Container = styled.div`
    height : calc(100vh - 50px);
    width : 100%;
    position: relative;
    padding : 50px;
`;

const Backdrop = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    filter : blur(3px);
    opacity : 0.5;
    z-index : 0;
`;

const Content = styled.div`
    display : flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width:30%;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    height: 100%;
    border-radius: 5px;
`;

const Data = styled.div`
    width:70%;
    margin-left : 10px;

`;

const Title = styled.h3`
    font-size : 32px;
`;


const Item = styled.span`
`;

const ItemContainer = styled.div`
    display : flex;
    margin:20px 0;
`;

const Divider = styled.div`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size : 12px;
    opacity:0.7;
    line-height:1.5;
    width:50%;
`;

const BtnItem = styled.li`
  width: 150px;
  height: 30px;
  background-color:rgba(20, 20, 20, 0.8);
  align-items:center;
  justify-content:center;
  display:flex;
  border-bottom: 3px solid 
    ${props => (props.current ? "#3498db" : "transparent")};
  transition:border-bottom .5s ease-in-out;
`;

const List = styled.ul`
    text-align:center;
    display:flex;
    margin: 20px 20px 0px;
`;

const imDBContainer = {
        width:32,
        height: 16,
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover'   
};

const testFunc = (tar) => {
    var ret = "";
    var trans = parseInt(tar);
    for(var i = 0; i <5; ++i){
        if(trans >= 2){
            ret += "🌕";
        }
        else if(trans >= 1){
            ret += "🌗";
        }
        else{
            ret += "🌑";
        }
        trans -= 2;
    }
    return ret;
}

const VideoBlock = styled.div`
    margin : 0px 20px;
    width: 450px;
    height: 200px;
    background-color:rgba(20, 20, 20, 0.8);
    display:absolute;
    overFlow-y:scroll;
`;

const ProductionBlock = styled.div`
    margin : 0px 20px;
    width: 450px;
    height: 200px;
    background-color:rgba(20, 20, 20, 0.8);
    display:grid;
    grid-template-columns:130px 130px 130px;
    overFlow-y:scroll;
`;

const ProductionCompany = styled.ul`
    width:130px;
    height:100px;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    text-align : center;
    margin:10px;
`;

const More = styled.div`
    margin : 0px 20px;
    width: 450px;
    height: 200px;
    background-color:rgba(20, 20, 20, 0.8);
`;


const DetailPresenter = ({result, loading, error, triggerBtn, setTriggerBtn, setTriggerBtn2, setTriggerBtn3}) => 
    loading ? (
        <>
        <Helmet>
            <title>Loading | Nomflix</title>
        </Helmet>
        <Loader /> 
        </> ) : (
        <Container>
            <Helmet>
                <title>{result.original_title
                            ? result.original_title
                            : result.original_name} | Nomflix
                </title>
            </Helmet>
            <Backdrop bgImage = {
                result.backdrop_path ? 
                    `https://image.tmdb.org/t/p/original${result.backdrop_path}` :
                    require("../../assets/noImage.png")
            }/>
            <Content>
                <Cover bgImage = {
                result.poster_path ? 
                    `https://image.tmdb.org/t/p/original${result.poster_path}` :
                    require("../../assets/noImage.png")
                    }
                />
                <Data>
                    <Title>
                        {result.original_title
                        ? result.original_title
                        : result.original_name}
                    </Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date && result.release_date.length > 4
                            ? result.release_date.substring(0,4)
                            : result.first_air_date && result.first_air_date.length > 4
                            ? result.first_air_date.substring(0,4)
                            : result.first_air_date}
                        </Item>
                        <Divider>●</Divider>
                        <Item>
                            {result.runtime
                            ? result.runtime
                            : result.episode_run_time} min
                        </Item>
                        <Divider>●</Divider>
                        <Item>
                            {result.genres &&
                                result.genres.map((genre, index) => 
                                index + 1 === result.genres.length ? genre.name : `${genre.name} / `)}
                        </Item>
                        {
                            result.original_title
                            ? <Divider>●</Divider>
                            : null
                        }
                        {
                            result.original_title
                            ?<button type="button" onClick={(e) => {
                                window.location.href= `https://www.imdb.com/title/${result.imdb_id}`;
                                }}
                                style={imDBContainer}>
                                
                            </button>
                            : null
                        }
                        <Divider>●</Divider>
                        <Item>
                            {
                                testFunc(result.vote_average)
                            }
                        </Item>
                        
                    </ItemContainer>
                    
                    <Overview>{result.overview}</Overview>
                    
                    <List>
                        <BtnItem current={triggerBtn === 0} onClick={setTriggerBtn}>Video</BtnItem>
                        <BtnItem current={triggerBtn === 1} onClick={setTriggerBtn2}>Production</BtnItem>
                        <BtnItem current={triggerBtn === 2} onClick={setTriggerBtn3}>More</BtnItem>
                    </List>

                    {
                        triggerBtn === 0
                        ? <VideoBlock>{result.videos.results.map((value,index) => 
                        <YouTube
                        width = "450px"
                        height = "200px"
                            video={`${value.key}`}
                        autoplay = {false}/>
                        )}</VideoBlock>
                        : triggerBtn === 1
                        ? <ProductionBlock>
                            {result.production_companies.map((value) => 
                            <ProductionCompany bgImage = {value.logo_path ? `https://image.tmdb.org/t/p/w300${value.logo_path}` : require("../../assets/noImage.png")}>
                                {value.name}
                            </ProductionCompany>
                            )}

                        </ProductionBlock>
                        : triggerBtn === 2
                        ? <More>more</More>
                        : null
                    }

                </Data>
            </Content>
        </Container>)
    
;

DetailPresenter.propTypes = {
    result : Proptypes.object,
    loading : Proptypes.bool.isRequired,
    error : Proptypes.string,
    triggerBtn : Proptypes.number.isRequired,
    setTriggerBtn : Proptypes.func,
    setTriggerBtn2 : Proptypes.func,
    setTriggerBtn3 : Proptypes.func
};

export default DetailPresenter;