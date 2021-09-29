import { ActionTypes } from "../contants/action-types";

const initialState ={
    product:[],
    product_details:{},
    compare_products:{}
}

export const productReducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state,product:payload}

        case ActionTypes.SET_PRODUCT:
            return {...state,product_details:payload}

        case ActionTypes.SET_COMPARE_PRODUCTS:
            return {...state,compare_products:payload}

        default:
            return state
    }
}