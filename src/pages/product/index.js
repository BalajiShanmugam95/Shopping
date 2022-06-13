import React, {useEffect, useState} from 'react'
import Header from "../../components/header";
import axios from "axios";
import './product.css'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from "../../redux/actions/productAction";

const getQueryText = (pram) =>{
    let query=""
    try {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        query= params.get(pram);
        return query
    } catch (error) {
        console.log(error)
        return ""
    }
};

export default function Product() {
    const [activePrams, updateActivepram] = useState(getQueryText('q'));
    const [isLoading, setIsLoading] = useState(true);

    const productDetail= useSelector((state)=>state["allproducts"]["product_details"]);
    const dispatch = useDispatch();
    
    const getProductDetails =()=>{
        setIsLoading(true);
        const options = {
            method: 'GET',
            url: 'https://fakestoreapi.com/products/'+getQueryText('id'),
          };

          axios.request(options).then(function (res) {
                alterProductDetail(res.data)
            }).catch(function (error) {
                setIsLoading(false);
                console.error(error);
            });
    }

    const alterProductDetail = (data)=>{
            let tempObj={};
            let product_detail=data;

            if(product_detail["image"]){
                tempObj['id']=product_detail.id;
                tempObj['title']=product_detail.title;
                tempObj['image']=product_detail["image"]|| "";
                tempObj['price']=product_detail.price;
                tempObj['description']=product_detail.description;
            }
            dispatch(getProduct(tempObj));
        setIsLoading(false);
    }
    useEffect(() => {
        getProductDetails();
    }, [])

    return (
        <div>
            <Header activePram={activePrams}/>
            {
                isLoading && <div className="spinner-container center-everything my-3">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
            }
            {!isLoading &&<div className="product-details">
                <div className="row m-0">
                    <div className="col-md-4 col-sm-12">
                        <div className="center-everything">
                            <img className="img-fluid d-block m-auto" width="70%" src={productDetail.image} alt="product" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div>
                            <p className="product-name-txt">{productDetail.title}</p>
                            <p>{productDetail.description}</p>
                            <div>
                                <span className="product-orginal-price"> M.R.P.: </span>
                                <strike>
                                    <span>&#8377;</span>
                                    <span>8,999</span>
                                </strike>
                            </div>
                            <div>
                                <span className="product-orginal-price">Price: </span>
                                <span className="current-price">&#8377; {productDetail.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
