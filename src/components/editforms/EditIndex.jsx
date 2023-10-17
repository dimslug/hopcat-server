import React from "react";
import { useLocation } from 'react-router-dom';
import HopSpotNav from "../nav/Nav";
import DrinkEdit from "./DrinkEdit";
import PromoEdit from "./PromoEdit";

export default function EditIndex(props) {
  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;
  const currentPage = props.currentPage
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const drinkID = queryParams.get('drink_id');
  const promoID = queryParams.get('promo_id');

  console.log(`currentPage : ${currentPage}`)

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
          <DrinkEdit
            setSessionToken={setSessionToken}
            sessiontoken={sessiontoken}
            setCreatorID={setCreatorID}
            creatorID={creatorID}
            currentPage={currentPage}
            drinkID={drinkID}
          />
        </>
      ) : currentPage === "promos" ? (
        <>
          <PromoEdit
            setSessionToken={setSessionToken}
            sessiontoken={sessiontoken}
            setCreatorID={setCreatorID}
            creatorID={creatorID}
            currentPage={currentPage}
            drinkID={drinkID}
            promoID={promoID}
          />
        </>
      ) : null}
    </>
  );
}