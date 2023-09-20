import React, { useState } from 'react';
import HopSpotNav from '../nav/Nav'
import DrinkAccordion from '../accordions/DrinkAccordion'
import PromoAccordion from '../accordions/PromoAccordion'
import { Button } from 'reactstrap';

function CreatorDisplay(props) {
  console.log(props)
  const sessiontoken = props.sessiontoken
  const setSessionToken = props.setSessionToken
  const currentPage = props.currentPage
  const creatorID = props.creatorID
  const setCreatorID = props.setCreatorID
  

  return (
    <>
       <HopSpotNav
       setSessionToken={setSessionToken}
       sessiontoken={sessiontoken} 
       setCreatorID={setCreatorID}
       creatorID={creatorID}
       />
{currentPage ==='drinks' ? (
  <DrinkAccordion 
  setSessionToken={setSessionToken}
  sessiontoken={sessiontoken}
  setCreatorID={setCreatorID}
  creatorID={creatorID}
  currentPage={currentPage}

  />


) : currentPage === 'promos' ? (
<PromoAccordion 
setSessionToken={setSessionToken}
sessiontoken={sessiontoken}
setCreatorID={setCreatorID}
creatorID={creatorID}
currentPage={currentPage}
/>

) : (
  <Button />
)}

   

</>
  )}

export default CreatorDisplay;