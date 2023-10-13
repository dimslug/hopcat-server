import React, { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";


export default function PromoCreate(props) {
    const sessiontoken = props.sessiontoken;
    const setSessionToken = props.setSessionToken;
    const currentPage = props.currentPage;
    const creatorID = props.creatorID;
    const setCreatorID = props.setCreatorID;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const drinkID = queryParams.get('drink_id');
    const navigate = useNavigate();

console.log(sessiontoken)
console.log(creatorID)


   //! UseStates
   const [selectedDrinkName, setSelectedDrinkName] = useState();
   const [loading, setLoading] = useState(true);
   const [selectedDrink, setSelectedDrink] = useState()
   const [drinks, setDrinks] = useState()
   const [selection, setSelection] = useState(false);



  //! Fetch Drink
  const fetchDrink = async () => {
  const url = `${baseURL}/drink/getone/${drinkID}`;
  const requestOption = {
    method: "GET",
    headers: new Headers({
      Authorization: sessiontoken,
    }),
  };
  try {
    const res = await fetch(url, requestOption);
    const data = await res.json();
   setSelectedDrink(data.results)
    // setSelectedDrinkName(selectedDrink[0].name)
  
   setLoading(false)
   console.log(`Inside Fetch Drink: ${selectedDrink[0].name}`)
  } catch (err) {
    console.error(err.message);
  
    
    
  }
};

//! Fetch Selected Drink
const fetchSelectedDrink = async (drinkID) => {
  const url = `${baseURL}/drink/getone/${drinkID}`;
  const requestOption = {
    method: "GET",
    headers: new Headers({
      Authorization: sessiontoken,
    }),
  };
  try {
    const res = await fetch(url, requestOption);
    const data = await res.json();
   setSelectedDrink(data.results)
    // setSelectedDrinkName(selectedDrink[0].name)
  
   setLoading(false)
   console.log(`Inside Fetch Drink: ${selectedDrink[0].name}`)
  } catch (err) {
    console.error(err.message);
  
    
    
  }
};


//! Fetch Drinks
const fetchDrinks = async () => {
  const url = `${baseURL}/drink/creations/${creatorID}`;
  const requestOption = {
    method: "GET",
    headers: new Headers({
      Authorization: sessiontoken,
    }),
  };
  try {
    const res = await fetch(url, requestOption);
    const data = await res.json();
    // drinks = data.results;
    setDrinks(data.results);
    // console.log(data);
    console.log(drinks);
    setLoading(false);
  } catch (err) {
    console.error(err.message);
   
  }
};

useEffect(() => {
  fetchDrink();
  fetchDrinks();
}, [sessiontoken, drinkID]);

//! Display Promo Create Form
const displayPromoCreateForm = () => {
  console.log(selectedDrink)
  if (selectedDrink && selectedDrink[0] && selectedDrink[0].name) {
    return (
   
      <Form onSubmit={handleSubmit}>
       <h3>{selectedDrink[0].name}</h3>
  
        <FormGroup>
          <Label>Promo Text</Label>
          <Input
            name="promoText"
            innerRef={promoTextRef}
            type="string"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Start Date</Label>
          <Input
            name="startDate"
            innerRef={startDateRef}
            type="date"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>End Date</Label>
          <Input
            name="endDate"
            innerRef={endDateRef}
            type="date"
          ></Input>
        </FormGroup>
        <FullButton>
          <Button color="success">Add Promo</Button>
        </FullButton>
  
      </Form>
  
    )

  }
  return null
}

//! Drink Chooser
const drinkChooser = () => {
const handleDrinkChoice = (event) => {
  const selectedName = event.target.value;
  setSelectedDrinkName(selectedName);

const selectedDrink = drinks.find((drink) => drink.name === selectedName)
setSelectedDrink(selectedDrink)
setSelection(true)
console.log(selectedDrink)
}
return (


 <Form>
  <FormGroup>
    <Label for="drinkDropdown">
      Please choose one of your drinks
    </Label>
    <Input
    id="drinkDropdown"
    name="select"
    type="select"
    value={selectedDrinkName}
    onChange={handleDrinkChoice}>
      <option></option>
      {drinks && drinks.length > 0 ? (
  drinks.map((drink, index) => (
    <option key={index} value={drink.name}>
     {drink.name}
    </option>
  ))) : (
    <option value="">No drinks available</option>
  )}
    </Input>
  </FormGroup>
 </Form>
  );

}

useEffect(() => {
  if (selectedDrink) {
    setSelection(true);
    fetchSelectedDrink(selectedDrink._id);
  }
}, [selectedDrink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const promoText = promoTextRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value

    let body = JSON.stringify({
      creatorID,
      drinkID,
      promoText,
      startDate,
      endDate
    });

    let url = `${baseURL}/promo/${drinkID}/create`;

    let headers = new Headers();
    headers.append(`Content-Type`, `application/json`);
    headers.append("Authorization", sessiontoken);

    const requestOptions = {
      headers: headers,
      body: body,
      method: "POST",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      console.log(data)
      navigate("/creator/promos")
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const promoTextRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  // "use strict";



  return (
    <>
    {/* {console.log(selectedDrink[0].name)} */}
     <h2>New Promo</h2>
      {selection ? displayPromoCreateForm() : drinkChooser()}
    </>

  )
}

