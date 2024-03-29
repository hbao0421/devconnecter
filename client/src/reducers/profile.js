import { GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE,UPDATE_PROFILE, GET_PROFILES,GET_REPOS } from "../actions/types";

const initial_state = {
    profile:null,
    profiles:null,
    repos:[],
    loading:true,
    error:{}
}

export default function(state=initial_state,action){
    const{type,payload} = action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
            };
        case GET_PROFILES:
            return{
                ...state,
                profiles:payload,
                loading:false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repos:[],
            };
        case GET_REPOS:
            return{
                ...state,
                repos:payload,
                loading:false
            }
        default:
            return state;
    }
}