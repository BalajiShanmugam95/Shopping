import React, {useEffect,useState} from 'react'
import axios from "axios";
import Header from "../../components/header";
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

    const createInitialDataSet = (pids) =>{
        pids.forEach(function (item, index) {
            fetchProductDetails(item,(produrdetails)=>{
                dispatch(setCompareProduct({...compareData,[item]:produrdetails}))
            })
        });
    }
    const fetchProductDetails = (id,callback)=>{
          const options = {
            method: 'GET',
            url: 'https://fakestoreapi.com/products/'+id,
          };

          axios.request(options).then(function (res) {
                callback(res.data)
            }).catch(function (error) {
                console.log(error)
            });
    }
    useEffect(() => {
        let pids=JSON.parse(getQueryText('pids'));
        setCompareableIds(pids);
        createInitialDataSet(pids)
    }, [])

    return (
        <div className="compare-page">
            <Header />
            <div className="container">
                <div className="row m-0">
                    {
                        compareableIds.map((item,i)=>(
                            <div className="col" key={i}>
                                <div>
                                   {JSON.stringify(compareData[item])}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Compare
