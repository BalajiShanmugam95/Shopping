import React, {useEffect,useState} from 'react'
import './search.css';
import Header from "../../components/header";
import {useHistory} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from "../../redux/actions/productAction";

const getQueryText = (querypram) =>{
    let query=""
    try {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        query= params.get(querypram);
        return query
    } catch (error) {
        console.log(error)
        return ""
    }
};

const Search = ()=>{
    let history = useHistory();

    const [activePrams, updateActivepram] = useState([""]);
    const [isLoading, setIsLoading] = useState(true);
    const [compareProduct, updateCompareProduct] = useState([]);
    const productList = useSelector((state)=> state["allproducts"]["product"]);
    const dispatch = useDispatch();

    const fetchProduct = () =>{
        dispatch(setProducts([]));
        setIsLoading(true);
        let queryString=getQueryText("q");
        updateActivepram(queryString)
        let baseUrl="https://fakestoreapi.com/products";

        if(queryString)
            baseUrl="https://fakestoreapi.com/products/category/"+queryString;

        axios.get(baseUrl).then((res) => {
            alterProductList(res.data)
            setIsLoading(false);
          }).catch((error)=>{
            setIsLoading(false);
              console.log(error)
          });

    }

    const alterProductList = (data)=>{
        let tempAry=[];
        data.forEach(element => {
            let tempObj={};
            let product_detail=element;
            if(product_detail["image"]){
                tempObj['id']=product_detail.id;
                tempObj['title']=product_detail.title;
                tempObj['image']=product_detail["image"] || "";
                tempObj['price']=product_detail.price;

                tempAry.push(tempObj)
            }
        });
        dispatch(setProducts(tempAry));
        setIsLoading(false);
    }

    const navToProductPage = (id) =>{
        history.push(`/product?q=${activePrams || ""}&id=${id}`)
    }
    const handleCompareCheckbox = (e,id) =>{
        let oldpoduct=[...compareProduct];
        if(e.target.checked){
            oldpoduct.push(id)
        }else{
            var index = oldpoduct.indexOf(id);
            if (index !== -1) {
                oldpoduct.splice(index, 1);
            }
        }
        updateCompareProduct(oldpoduct) 
    }
    const navToComparePage = ()=>{
        if(compareProduct.length > 0)
            history.push(`/compare?pids=`+JSON.stringify(compareProduct)) 
    }
    const handleQueryChange = () =>{
        fetchProduct();
    }

    useEffect(() => {
        fetchProduct();
    }, [])

    return (
            <div>
                <Header queryChange={handleQueryChange} activePram={activePrams}/>
                <div className="search-page">
                    <div className="top-search-count">
                        <span>1-16 of over 1,000 results for <span style={{color:"#c45500"}}>{activePrams || "All"}</span></span>
                        {compareProduct.length > 0 && <button onClick={()=>navToComparePage()} type="button" className="btn btn-light btn-compare">Compare</button>}
                    </div>
                    <div className="search-result">
                        <div className="row m-0 h-100">
                            <div className="col-md-2">
                                <div className="result-filter-by">
                                    <div>
                                        <p className="filter-by-title">Delivery Day</p>
                                        <div className="option-set">
                                            <div className="custom-control custom-checkbox filter-custom-space">
                                                <input type="checkbox" className="custom-control-input filter-big-checkbox" id="get-by-tommo" />
                                                <label className="custom-control-label ms-1" htmlFor="get-by-tommo">Get It by Tomorrow</label>
                                            </div>
                                            <div className="custom-control custom-checkbox filter-custom-space">
                                                <input type="checkbox" className="custom-control-input filter-big-checkbox" id="get-by-twodays" />
                                                <label className="custom-control-label ms-1" htmlFor="get-by-twodays">Get It in 2 Days</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10">
                                {
                                    isLoading && <div className="spinner-container center-everything">
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                }
                                {
                                    !isLoading && !productList.length && <div className="text-center my-3">No Products Found....</div>
                                }
                                <div className="result-list">
                                    {
                                        productList.map((product,i)=>(
                                            <div key={i}>
                                                <div className="row m-0">
                                                    <div className="col-md-3 d-flex">
                                                        <div className="form-check">
                                                            <input className="form-check-input extra-big-checkbox" onClick={(e)=>handleCompareCheckbox(e,product.id)} type="checkbox" />
                                                        </div>
                                                        <img className="img-fluid d-block m-auto" onClick={()=>navToProductPage(product.id)} width="70%" alt="" src={product.image} />
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="product-info" onClick={()=>navToProductPage(product.id)}>
                                                            <p className="product-name">{product.title}</p>
                                                            <div className="limited-time-btn">
                                                                <span>Limited time deal</span>
                                                            </div>
                                                            <div className="price-txt">
                                                                <div>
                                                                    <sup className="sup-currency">&#8377;</sup>
                                                                    <span className="current-price">{product.price}</span>
                                                                </div>
                                                                <div className="orginal-price">
                                                                    <strike>
                                                                        <span>&#8377;</span>
                                                                        <span>8,999</span>
                                                                    </strike>
                                                                </div>
                                                                <div className="money-save-txt">
                                                                    <span>Save ₹1,700 (19%)</span>
                                                                </div>
                                                            </div>
                                                            <div className="save-coupon-block">
                                                                <div className="save-with-coupon">Save <span>&#8377;</span>300</div>
                                                                <span>with coupon</span>
                                                            </div>
                                                            <div className="delivery-details">
                                                                <span>Get it by <span className="day-highlight">Tomorrow,</span></span>
                                                                <span className="day-highlight">September 17</span>
                                                                <span>FREE Delivery by No Logo</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="result-divider"></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Search