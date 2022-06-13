import React, {useEffect,useState} from 'react'
import axios from "axios";
import Header from "../../components/header";
import CompareTemplate  from './compareTemplate';
import { setCompareProduct } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from 'react-redux';

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

const Compare = () => {
    const [compareableIds, setCompareableIds] = useState([]);

    let compareData = useSelector((state)=> state.allproducts.compare_products)
    const dispatch = useDispatch();

    const fetchAllProductDetails = (ids)=>{
        const urlAry = ids.map((id)=> 'https://fakestoreapi.com/products/'+id);
        axios.all(urlAry.map(l => axios.get(l))).then(axios.spread(function (...res) {
                let prdDetails={};
                res.map((item)=>{
                    prdDetails[item.data.id]=item.data;
                })
                
                dispatch(setCompareProduct(prdDetails))
        }));
    }
    useEffect(() => {
        let pids=JSON.parse(getQueryText('pids'));
        setCompareableIds(pids);
        fetchAllProductDetails(pids);
    }, [])

    if(compareableIds.length == 0 || Object.keys(compareData).length !=compareableIds.length)
        return null

    return (
        <div className="compare-page">
            <Header />
            <div className="container">
                <div className="row m-0">
                    {
                        compareableIds.map((item,i)=>(
                            <div className="col" key={i}>
                                <CompareTemplate prdDetails={compareData[item]} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Compare
