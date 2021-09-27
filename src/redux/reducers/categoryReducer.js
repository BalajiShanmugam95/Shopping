import { ActionTypes } from "../contants/action-types";

const initialState = {
    category:[]
}
export const categoryReducer = (state=initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_CATEGORY:
            return {...state,category:payload}

        default:
            return {...state}
    }
}