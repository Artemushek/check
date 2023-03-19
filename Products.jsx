import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import "./Products.scss"
import List from "../components/List"
import useFetch from '../hooks/useFetch'

const Products = () => {

  const catId = parseInt(useParams().id)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState("asc")
  const [selectedSubCats, setSelectedSubCats] = useState([])
 
  const { data, loading, error } = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`)
    
  //const filter = subCats.map((item) => `&[filters][sub_categories][id][$eq]=${item}`).join('')
  //const {data} = useFetch(`/products?populate=*&[filters][categories][id]=${catId}${filter}`);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
  
    setSelectedSubCats((prevSelectedSubCats) =>
      isChecked
        ? [...prevSelectedSubCats, value]
        : prevSelectedSubCats.filter((item) => item !== value)
    );
  };  
  
  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h3>Product Categories</h3>
          {data?.map((item)=>(
            <div className="inputItem" key={item.id}>
              <input type="checkbox" id={item.id} value={item.id} onChange={handleChange}/>
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
         
        </div>
        <div className="filterItem">
          <h3>Filter by price</h3>
          <div className="inputItem">
            <span>0</span>
            <input type="range" min={0} max={1000} onChange={(e)=>setMaxPrice(e.target.value)}/>
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h3>Sort by</h3>
          <div className="inputItem">
            <input type="radio" id="asc" value="asc" name="price" onChange={(e)=>setSort("asc")}/>
            <label htmlFor="asc">Price (Up)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name="price" onChange={(e)=>setSort("desc")}/>
            <label htmlFor="desc">Price (Down)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats}/>
      </div>
    </div>
  )
}

export default Products