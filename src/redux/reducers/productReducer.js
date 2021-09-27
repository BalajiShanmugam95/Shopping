import { ActionTypes } from "../contants/action-types";

const initialState ={
    product:[],
    product_details:{}
}

export const productReducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state,product:payload}

        case ActionTypes.SET_PRODUCT:
            return {...state,product_details:payload}

        default:
            return state
    }
}