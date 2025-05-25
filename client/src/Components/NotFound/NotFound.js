import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import { Button } from "react-bootstrap";

const NotFound = () => {    
    return (
        // <div className="notFound">
        // <div className="notFoundText">
        //     <h1>404</h1>
        //     <h2>Page Not Found</h2>
        // </div>
        // </div>

        <div className="container404">
            <div className="notFound">
                <div class="number404">404</div>
                <br></br>
                <div class="text404">
                    <span>Ooops...</span>
                    page not found
                </div>
                <br></br>
                <br></br>
                <hr></hr>
                
                <Button variant="secondry"> 
                    <Link to="/">Home</Link>
                </Button>
            
            </div>
        </div>

        
    );
}
export default NotFound;