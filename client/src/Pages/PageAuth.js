import React, { useState } from "react";

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { PageLayout } from "../Components/PageLayout";
import { ProfileData } from "../Components/ProfileData";
import { callMsGraph } from "../graph";
import Button from "react-bootstrap/Button";
import Sell from "../Components/Sell/Sell";
import Product from "../Components/Product/Product";
import ProductImages from "../Components/ProductImages/ProductImages";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn
  } from 'mdb-react-ui-kit';



/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    console.log(accounts[0]);

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <h5 className="card-title">Welcome {accounts[0].username}</h5>
            <h6 className="card-title">Id: {accounts[0].homeAccountId.split('.')[0]}</h6>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
            }
            <hr></hr>

            <MDBRow around>
                <MDBCol size='4'>
                    <Sell/>
                </MDBCol>

                <MDBCol size='4'>
                    <Product/>
                </MDBCol>
            </MDBRow>  
            <hr></hr>
            
            <ProductImages/>     
            
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">

            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        
        </div>
        



    );
};


function PageAuth() {
    return (
      <div>        
        <PageLayout>
            <MainContent />
        </PageLayout>
      </div>
    );
  }
  
export default PageAuth;