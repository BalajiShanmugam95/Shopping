import React,{useState,useEffect} from 'react'
import './header.css';
import axios from "axios";
import { useHistory,Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from "../../redux/actions/categoryAction";


const Header = ({queryChange,activePram,searchChange})=>{

    let history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    const categoryList = useSelector((state)=>state.allcategory.category);
    const dispatch = useDispatch();

    const handleListClick = (category)=>{
        setSearchText("")
        history.push('/search?q='+(category || ""));

        if(typeof(queryChange) == "function")
            queryChange()
    }

    const onSearchHits = () =>{
        history.push('/search?sq='+(searchText || ""));

        if(typeof(queryChange) == "function")
            searchChange()
    }

    const handleSearchChange = (e) =>{
        let searchtxt=e.target.value;
        setSearchText(searchtxt)
    }
    
    const getCategories = () =>{
        setIsLoading(true)
        const options = {
            method: 'GET',
            url: 'https://fakestoreapi.com/products/categories',
          };

          axios.request(options).then(function (res) {
            alterCategory(res.data);
            setIsLoading(false)
            }).catch(function (error) {
                setIsLoading(false)
                console.error(error);
            });
    }

    const alterCategory = (data) =>{
        dispatch(setCategory(data));
        setIsLoading(false);
    }
    
    useEffect(() => {
        if(!categoryList.length)
            getCategories();
    }, [])

    return (
        <div>
            <div className="nav-container">
                <div className="custom-nav">
                    <Link to="/"><div>
                        <span className="no-logo-txt">No Logo</span>
                    </div>
                    </Link>
                    {/* <div className="header-search-block">
                        <div className="search-box">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary dropdown-toggle header-search-dropdown-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All</button>
                                    <div className="dropdown-menu">
                                        <span className="dropdown-item">Action</span>
                                    </div>
                                </div>
                                <input type="text" className="form-control search-box-input" aria-label="Text input with dropdown button" value={searchText} onChange={(e)=>handleSearchChange(e)} onKeyPress={event => {if (event.key === 'Enter') {onSearchHits()}}}/>
                                <div className="input-group-append">
                                    <button onClick={()=>onSearchHits()} className="btn btn-outline-secondary header-search-btn" type="button">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="custom-sub-nav">
                    <ul className="sub-nav-list">
                            <li className={!activePram?"active":''} onClick={()=>handleListClick("")}>
                                <div>
                                    <i className="fas fa-bars me-2"></i>
                                    <span>All</span>
                                </div>
                            </li>
                            {isLoading && <li>
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </li>}
                        {
                            categoryList.map((category,i)=>(
                                <li key={i} onClick={()=>handleListClick(category)} className={`text-capitalize ${category == activePram?"active":"" }`}>{category}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
