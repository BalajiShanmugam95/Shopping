import React, {useEffect,useState} from 'react'
import axios from "axios";

const authPrams = {login: 'd68f4418d45f188701fbaf896e88eb6a', authtoken: 'c88bd383d87b54232cf8275b43da86db'};

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
    const [compareData,updateCompareData] = useState({});
    
    const createInitialDataSet = (pids) =>{
        let initData= {}

        pids.forEach(function (item, index) {
            let tempdata= {}
            fetchProductDetails(item,(produrdetails)=>{
                tempdata[item]=produrdetails;
            })

            updateCompareData(tempdata)
            console.log(initData)
        });
    }
    const fetchProductDetails = (id,callback)=>{
          const options = {
            method: 'GET',
            url: 'https://api.jumpseller.com/v1/products/'+id+'.json',
            params: authPrams,
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
            <div className="container">
                <div className="row m-0">
                    {
                        compareableIds.map((item,i)=>{
                            return<div className="col" key={i}>
                                <div>
                                    <div>{JSON.stringify(compareData)}
                                        
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Compare
