import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE,PROFILEE_ERROR } from "./types";

export const getCurrentProfile = ()=> async dispatch=>{
    try{
        const res  = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:PROFILEE_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}