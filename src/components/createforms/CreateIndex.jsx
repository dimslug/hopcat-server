import React from "react";
import { useLocation } from 'react-router-dom';
import HopSpotNav from "../nav/Nav";
import DrinkCreate from "./DrinkCreate";
import PromoCreate from "./PromoCreate";

export default function CreateIndex(props) {
  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const currentPage = props.currentPage;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;
  console.log(`currentPage : ${currentPage}`)


  return (
    <>
      <HopSpotNav
        setSessionToken={setSessionToken}
        sessiontoken={sessiontoken}
        setCreatorID={setCreatorID}
        creatorID={creatorID}
      />
       {/* <div className="row mt-3"> */}
      {/* <div className="col-6 offset-3"> */}
     
      {/* </div> */}
    {/* </div> */}
      {currentPage === "drinks" ? (
        <>
          <DrinkCreate
            setSessionToken={setSessionToken}
            sessiontoken={sessiontoken}
            setCreatorID={setCreatorID}
            creatorID={creatorID}
            currentPage={currentPage}
          />
          
        </>
      ) : currentPage === "promos" ? (
        <>
          <PromoCreate
            setSessionToken={setSessionToken}
            sessiontoken={sessiontoken}
            setCreatorID={setCreatorID}
            creatorID={creatorID}
            currentPage={currentPage}
          />
        </>
      ) : null}
    </>
  );
}
