import { GET_PROFILE, PROFILEE_ERROR } from "../actions/types";

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
            return{
                ...state,
                profile:payload,
                loading:false
            };
        case PROFILEE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        default:
            return state;
    }
}