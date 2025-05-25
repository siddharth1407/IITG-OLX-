import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./Post.css";
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";

import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  let [posts, setPosts] = useState([]); //for showing all posts in Descending order of date
  let [posts2, setPosts2] = useState([]); //for showing all posts in Ascending order of date
  let [loading, setLoading] = useState(false);
  let [loading2,setLoading2] = useState(false)
  useEffect(async() => {
    setLoading(true);
    setLoading2(true)

    const res =  await fetch("/api/get/images")
    const data = await res.json();
    setPosts(data.products);
    setAllPost(data.products);
    setLoading(false);


    const res2 =  await fetch("/api/get/images")
    const data2 = await res2.json();
    setPosts2(data2.products);
    setLoading2(false);

      

  }, [setAllPost]);
  // quickMenuCards assign all cards of post item later it will be displayed
  let quickMenuCards = posts.map((product, index) => {
    return(<div className="quick-menu-cards" key={index}> <PostCards product={product} index={index} /> </div>);
  });

  let freshRecomendationCards = posts2.map((product, index) => { 
    if(index<4) {
        return (
            <div className="fresh-recomendation-cards" key={index}> <PostCards product={product} index={index} /> </div>
        );
    }
    return null 
});
  return (
    <div className="postParentDiv">
      {posts && (
        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <Link to="./viewmore">
              {" "}
              <span>View more</span>{" "}
            </Link>
          </div>
          <div className="cards">
            {" "}
            {loading ? <BarLoading /> : quickMenuCards}
          </div>
        </div>
      )}
     <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="fresh-recomendation-cards cards">{loading2 ? <BarLoading/> : freshRecomendationCards}</div> 
      </div> 
    </div>
  );
}

export default Posts;
