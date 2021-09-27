import { ActionTypes } from "../contants/action-types";

export const setCategory = (category) =>{
    return {
        type:ActionTypes.SET_CATEGORY,
        payload:category
    }
}