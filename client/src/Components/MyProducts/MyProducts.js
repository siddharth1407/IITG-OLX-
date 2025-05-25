// import React,{useContext} from 'react'
// import "./myproducts.css"
// import {AllPostContext} from "../../contextStore/AllPostContext" ;
// import PostCards from '../PostCards/PostCards';
// import {Link} from "react-router-dom";
// import { useMsal, useIsAuthenticated } from "@azure/msal-react";

// function MyProducts() {

//     const {account}=useMsal();
//     const isAuthenticated = useIsAuthenticated();

//     const userId = account[0].homeAccountId.split(".")[0];
    
//     const {allPost}=useContext(AllPostContext)
//     let displayCards=allPost.filter((itm)=>itm.seller===userId).map((product,index)=>{return(
//       <PostCards product={product} index={index} key={index} />
//     )});
    
//     return (<>
//      { category!=="null" && <div>
//             <div className="moreView">
//         <div className="heading">
//           <span>{category}</span>
//          <Link to="./viewmore"> <span>View more</span> </Link>
//         </div> 
//         <div className="cards">{displayCards}</div>
//       </div>
//         </div> } 
//         </>
//    )
// }

// export default MyProducts
