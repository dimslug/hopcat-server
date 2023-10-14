import React, { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";

export default function PromoEdit(props) {
  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const currentPage = props.currentPage;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;
  const drinkID = props.drinkID;
  const promoID = props.promoID;

  const navigate = useNavigate();
  
  console.log(`promoID : ${promoID}`);
  
  //! useStates
  const [loading, setLoading] = useState(true);
  const [promoToEdit, setPromoToEdit] = useState([]);
  const [startDateFormatted, setStartDateFormatted] = useState("");
  const [endDateFormatted, setEndDateFormatted] = useState("");

  //! useEffects
  useEffect(() => {
    fetchPromo();
  }, [sessiontoken, promoID]);

  useEffect(() => {
    console.log(promoToEdit)
    if (promoToEdit.length > 0) {
      const startDateFormatter = new Date(promoToEdit[0].startDate);
      setStartDateFormatted(startDateFormatter.toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      ));
      const endDateFormatter = new Date(promoToEdit[0].endDate);
      setEndDateFormatted(endDateFormatter.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }));
 
    }
    setLoading(false);
  }, [promoToEdit])



  //! Fetch Promo
  const fetchPromo = async () => {
    console.log(`promoID : ${promoID}`);
    console.log(`sessiontoken : ${sessiontoken}`);
    const url = `${baseURL}/promo/getone/${promoID}`;
    const requestOption = {
      method: "GET",
      headers: new Headers({
        Authorization: sessiontoken,
      }),
    };
    try {
      const res = await fetch(url, requestOption);
      const data = await res.json();
      console.log(`data : ${JSON.stringify(data)}`);
      console.log(`data : ${data.results}`);
      setPromoToEdit(data.results);
    } catch (err) {
      console.error(err.message);
    } finally {

      
    }
  };

 

  //! Display Edit Form
  const displayEditForm = () => {

   console.log(startDateFormatted)
   console.log(endDateFormatted)
   
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
         
          <Input id="promoText" name="promoText" innerRef={promoTextRef}/>
          <Label for="promoText">Current Text: {promoToEdit[0].promoText}</Label>
       </FormGroup>
        <FormGroup floating>
         
          <Input id="startDate" name="startDate" innerRef={startDateRef} type="date">
          </Input>
          <Label for="startDate">Current Start Date: {startDateFormatted}</Label>
        </FormGroup>
        <FormGroup floating>
         
          <Input id="endDate" name="endDate" innerRef={endDateRef} type="date">
          </Input>
          <Label for="endDate">Current End Date: {endDateFormatted}</Label>
        </FormGroup>
       
        <FullButton>
          <Button color="success">Edit Promo</Button>
        </FullButton>
      </Form>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  const requestBody = {};

  if (promoToEdit[0].promoText !== promoTextRef.current.value && promoTextRef.current.value.trim() !== '') {
    requestBody.promoText = promoTextRef.current.value;
  }

  if (promoToEdit[0].startDate !== startDateRef.current.value && startDateRef.current.value.trim() !== '') {
    requestBody.startDate = startDateRef.current.value;
  }

  if (promoToEdit[0].endDate !== endDateRef.current.value && endDateRef.current.value.trim() !== '') {
    requestBody.endDate = endDateRef.current.value;
  }

    requestBody.creatorID = creatorID
    requestBody.drinkID = drinkID

    console.log(`Data from form payload : ${JSON.stringify(requestBody)}`);

    let url = `${baseURL}/promo/edit/${promoID}`;

    let headers = new Headers();
    headers.append(`Content-Type`, `application/json`);
    headers.append("Authorization", sessiontoken);

    const requestOptions = {
      headers: headers,
      body: JSON.stringify(requestBody),
      method: "PATCH",
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

     
      navigate("/creator/promos");
    } catch (err) {
      console.error(err.message);
    }
  };

  const promoTextRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  
  
console.log(loading)
  return (
    <>
      <h2>Edit Promo</h2>
      {loading ? (
        
        <p>Loading...</p>
      ) : promoToEdit && promoToEdit.length > 0 ? (
        displayEditForm()
      ) : (
        <p>No data found.</p>
      )}
    </>
  );
}
