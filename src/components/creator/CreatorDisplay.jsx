import React, { useState } from "react";
import HopSpotNav from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import DrinkAccordion from "../accordions/DrinkAccordion";
import PromoAccordion from "../accordions/PromoAccordion";
import { Button } from "reactstrap";

function CreatorDisplay(props) {
  console.log(props);

  const navigate = useNavigate();

  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const currentPage = props.currentPage;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;

  return (
    <>
      <HopSpotNav
        setSessionToken={setSessionToken}
        sessiontoken={sessiontoken}
        setCreatorID={setCreatorID}
        creatorID={creatorID}
      />
      {currentPage === "drinks" ? (
        <>
          <h2>Drinks</h2>
          <Button onClick={() => navigate(`/creator/create?currentPage=${currentPage}`)} color="dark">
            Click Here To Create A Drink
          </Button>
          <DrinkAccordion
            setSessionToken={setSessionToken}
            sessiontoken={sessiontoken}
            setCreatorID={setCreatorID}
            creatorID={creatorID}
            currentPage={currentPage}
          />
        </>
      ) : currentPage === "promos" ? (
        <>
          <h2>Promos</h2>
          <Button onClick={() => navigate(`/creator/create?currentPage=${currentPage}`)} color="dark">
            Click Here To Create A Promo
          </Button>
          <PromoAccordion
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

export default CreatorDisplay;
