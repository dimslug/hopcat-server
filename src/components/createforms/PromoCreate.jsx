import React, { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, useLocation } from 'react-router-dom';
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";
import PlaceComponent from '../placecomponent/PlaceComponent' 


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

console.log(`promo create drinkID = ${drinkID}`)


   //! useStates
   const [drink, setDrink] = useState("")
   const [drinks, setDrinks] = useState("")
   const [loading, setLoading] = useState(true);
   const [selectedDrink, setSelectedDrink] = useState("")
   const [selectedDrinkID, setSelectedDrinkID] = useState("");
   const [selectedDrinkName, setSelectedDrinkName] = useState("");
   const [selection, setSelection] = useState(false);
   const [selectedAddress, setSelectedAddress] = useState({
    formattedAddress: '',
    latitude: null,
    longitude: null
   })
  

   //! useEffects

   useEffect(() => {
    if (!drinkID) {
      console.log('fetching creators drinks')
      fetchDrinks();
    }
    
  }, []);

  useEffect(() => {
    if (drinkID) {
      console.log(`fetching: ${drinkID}`)
      fetchDrink();
    }
  }, [drinkID]);

  
useEffect(() => {
  if (selectedDrinkID) {
    console.log(`fetching slected drink: ${selectedDrinkID}`)
    fetchSelectedDrink(selectedDrinkID._id);
    
  }
}, [selectedDrinkID]);

useEffect (() => {
  if (selectedDrink) {
  console.log(`Inside setSelection useEffect, selection = ${selection}`)
  setSelection(true)
  }
}, [selectedDrink])

// useEffect(() => {
//   if (PlaceComponent.place){
//   setSelectedAddress({
//     formattedAddress: PlaceComponent.place.formatted_address,
//     latitude: PlaceComponent.place.geometry.location.lat(),
//     longitude: PlaceComponent.place.geometry.location.lng()
//   })}
// }, [ PlaceComponent.place ])

//! useRefs
const promoTextRef = useRef();
const startDateRef = useRef();
const endDateRef = useRef();
const promoPlaceRef = useRef();


//! PlaceComponent Address Callback
const handleAddressSelected = (address) => {
  setSelectedAddress(address)
}

//! Fetches
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
    console.log(`Inside Fetch Drink: ${selectedDrink}`)
    setLoading(false)
  
  } catch (err) {
    console.error(err.message);
  
  }
  
};

//! Fetch Selected Drink
const fetchSelectedDrink = async (selectedDrinkID) => {
  const url = `${baseURL}/drink/getone/${selectedDrinkID}`;
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
    console.log(`Inside Fetch Selected Drink: ${selectedDrink}`)
    setLoading(false)

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
    setDrinks(data.results);
    console.log(`Inside Fetch Drinks= ${drinks}`);
   
  } catch (err) {
    console.error(err.message);
   
  }
};

//! Display Promo Create Form
const displayPromoCreateForm = () => {
  console.log(selectedDrink)
  console.log(`Inside Display Promo loading = ${loading}`)
  if (
    !loading &&
    selectedDrink 
    && 
    selectedDrink[0] 
    && 
    selectedDrink[0].name
    ) 
    {
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
           <Label>Promo Location</Label>
           {/* <Input> */}
          
          <PlaceComponent onAddressSelected={handleAddressSelected} />
          {/* name="promoPlace"
          innerRef={promoPlaceRef}
          type="text"
         
         
           {/* </Input> */}
            
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
  const choice = event.target.value;
  setSelectedDrinkName(choice);
  const selectedDrinkID = drinks.find((drink) => drink.name === choice)
  setSelectedDrinkID(selectedDrinkID)
  console.log(`Inside Drink Chooser selectedDrink= ${drink}`)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDrinkIDValue = selectedDrinkID ? selectedDrinkID._id : null;
    const effectiveDrinkID = drinkID === null ? selectedDrinkIDValue : drinkID;
  
    console.log(selectedAddress);
    

    const promoText = promoTextRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const promoPlace = selectedAddress;

    console.log(promoPlace)

    let body = JSON.stringify({
      creatorID,
      drinkID: effectiveDrinkID,
      promoText,
      startDate,
      endDate,
      promoPlace
    });

    console.log(body)

    let url = `${baseURL}/promo/${effectiveDrinkID}/create`;

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



  return (
    <>
    {console.log(selection)}
     <h2>New Promo</h2>
      {selection ? displayPromoCreateForm() : drinkChooser()}
    </>

  )
}

