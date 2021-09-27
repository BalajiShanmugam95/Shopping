import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";

const reducers = combineReducers({
    allproducts : productReducer,
    allcategory : categoryReducer
})

export default reducers