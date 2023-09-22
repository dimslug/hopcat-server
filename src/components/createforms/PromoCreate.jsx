import React, { useRef } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";
import HopSpotNav from "../nav/Nav";

export default function PromoCreate(props) {
    const sessiontoken = props.sessiontoken;
    const setSessionToken = props.setSessionToken;
    const currentPage = props.currentPage;
    const creatorID = props.creatorID;
    const setCreatorID = props.setCreatorID;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const drinkID = queryParams.get('drink_id');

  return (
    <>
    {console.log(drinkID)}
     <HopSpotNav
        setSessionToken={setSessionToken}
        sessiontoken={sessiontoken}
        
        setCreatorID={setCreatorID}
        creatorID={creatorID}
      />
      <h2>New Promo</h2>
   
    </>

  )
}

