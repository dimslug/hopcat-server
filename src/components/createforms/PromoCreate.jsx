import React, { useRef } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const creatorID = creatorID
    
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

  return (
    <>
    {console.log(drinkID)}
      <h2>New Promo</h2>
      <Form onSubmit={handleSubmit}>
      

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
          {/* {yearRange()} */}
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
    </>

  )
}

