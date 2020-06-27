import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component{
    constructor(props){
        super(props);
        const {
            location : {pathname}
        } = props
        this.state = {
            result : null,
            error : null,
            loading: true,
            isMovie : pathname.includes("/movie"),
            triggerBtn : 0
        };
    };
    
    setTriggerBtn = (event) => {
        this.setState({triggerBtn : 0})
    }
    setTriggerBtn2 = (event) => {
        this.setState({triggerBtn  : 1})
    }
    setTriggerBtn3 = (event) => {
        this.setState({triggerBtn : 2})
    }
    async componentDidMount(){
        const {
            match:{
                params : {id}
            },
            history : {push},
        } = this.props;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)){
            return push("/");
        }
        const {isMovie} = this.state;
        let result = null;
        try{
            if(isMovie){
                ({data : result} = await moviesApi.movieDetail(parsedId));
            }else{
                ({data : result} = await tvApi.showDatail(parsedId));
            }
            
        }catch{
            this.setState({error: "Can't find anything."});
        }finally{
            this.setState({loading:false, result })
        }
    }

    render() {
        const { result, error, loading, triggerBtn} = this.state;
        //console.log(result);
        return (
            <DetailPresenter 
                result = {result}
                error = {error}
                loading= {loading}
                triggerBtn = {triggerBtn}
                setTriggerBtn = {this.setTriggerBtn}
                setTriggerBtn2 = {this.setTriggerBtn2}
                setTriggerBtn3 = {this.setTriggerBtn3}
            />
        );
    }
}