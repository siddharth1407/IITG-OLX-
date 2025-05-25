import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();
  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              <option value="null">Choose From Here</option>
              <option value="Stationary">Stationary</option>
              <option value="Electronics">Electronics</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Cycles">Cycles</option>
              <option value="Mobiles and Laptops">Mobiles and Laptops</option>
              <option value="Other Accessories">Other Accessories</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("Stationary")} >Stationary</span>
            <span onClick={()=>setCategory("Electronics")} >Electronics</span>
            <span onClick={()=>setCategory("Musical Instruments")} >Musical Instruments</span>
            <span onClick={()=>setCategory("Cycles")} >Cycles</span>
            <span onClick={()=>setCategory("Mobiles and Laptops")} >Mobiles and Laptops</span>
            <span onClick={()=>setCategory("Other Accessories")} >Other Accessories</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../Images/iitg-text.png" alt="" />
        </div>
      </div>
     { category!=null && <DynamicPosts category={category}/>  }
    </div>
  );
}

export default Banner;
