import React, { useRef } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";
import HopSpotNav from "../nav/Nav";

export default function DrinkCreate(props) {
  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const currentPage = props.currentPage;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const creatorID = creatorID
    const name = nameRef.current.value;
    const cat1 = cat1Ref.current.value;
    const cat2 = cat2Ref.current.value;
    const cat3 = cat3Ref.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const photo = photoRef.current.value;
    const ingredients = ingredientsRef.current.value

    let body = JSON.stringify({
      creatorID,
      name,
      cat1,
      cat2,
      cat3,
      price,
      description,
      photo,
      ingredients
    });

    let url = `${baseURL}/drink/create`;

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
      navigate("/creator/drinks")
      
    } catch (err) {
      console.error(err.message);
    }
  };

  const nameRef = useRef();
  const cat1Ref = useRef();
  const cat2Ref = useRef();
  const cat3Ref = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const photoRef = useRef();
  const ingredientsRef = useRef();

  let ingredientsList = [null, "G", "PG", "PG-13", "NC-17", "R"];
  let cat1List = []
  let cat2List = []
  let cat3List = []

  // const yearRange = () => {
  //   let years = [null];
  //   const thisYear = new Date().getFullYear();
  //   for (let i = thisYear; i >= 1892; i--) years.push(i);
  //   return (
  //     <>
  //       <Input name="movieYear" innerRef={yearRef} type="select">
  //         {years.map((year, index) => {
  //           return (
  //             <option key={index} value={year}>
  //               {year}
  //             </option>
  //           );
  //         })}
  //       </Input>
  //     </>
  //   );
  // };

  return (
    <>
      {console.log(props)}
      <HopSpotNav
        setSessionToken={setSessionToken}
        sessiontoken={sessiontoken}
        setCreatorID={setCreatorID}
        creatorID={creatorID}
      />
      <h2>New Drink</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input name="drinkName" innerRef={nameRef} />
        </FormGroup>
        <FormGroup>
          <Label>Category 1</Label>
          <Input name="drinkCat1" innerRef={cat1Ref} type="select">
            <option value={""}></option>
            <option value={"Action"}>Action</option>
            <option value={"Comedy"}>Comedy</option>
            <option value={"Documentary"}>Documentary</option>
            <option value={"Drama"}>Drama</option>
            <option value={"Family"}>Family</option>
            <option value={"Fantasy"}>Fantasy</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Musical"}>Musical</option>
            <option value={"Police Procedural"}>Police Procedural</option>
            <option value={"Thriller"}>Thriller</option>
            <option value={"Science Fiction"}>Science Fiction</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Category 2</Label>
          <Input name="drinkCat2" innerRef={cat2Ref} type="select">
            <option value={""}></option>
            <option value={"Action"}>Action</option>
            <option value={"Comedy"}>Comedy</option>
            <option value={"Documentary"}>Documentary</option>
            <option value={"Drama"}>Drama</option>
            <option value={"Family"}>Family</option>
            <option value={"Fantasy"}>Fantasy</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Musical"}>Musical</option>
            <option value={"Police Procedural"}>Police Procedural</option>
            <option value={"Thriller"}>Thriller</option>
            <option value={"Science Fiction"}>Science Fiction</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Category 3</Label>
          <Input name="drinkCat3" innerRef={cat3Ref} type="select">
            <option value={""}></option>
            <option value={"Action"}>Action</option>
            <option value={"Comedy"}>Comedy</option>
            <option value={"Documentary"}>Documentary</option>
            <option value={"Drama"}>Drama</option>
            <option value={"Family"}>Family</option>
            <option value={"Fantasy"}>Fantasy</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Musical"}>Musical</option>
            <option value={"Police Procedural"}>Police Procedural</option>
            <option value={"Thriller"}>Thriller</option>
            <option value={"Science Fiction"}>Science Fiction</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input name="drinkPrice" innerRef={priceRef} type="number">
            {/* {ratings.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))} */}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input
            name="drinkDescription"
            innerRef={descriptionRef}
            type="string"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Ingredients</Label>
          <Input
            name="drinkIngredients"
            innerRef={ingredientsRef}
            type="string"
          ></Input>
          {/* {yearRange()} */}
        </FormGroup>
        <FormGroup>
          <Label>Photo</Label>
          <Input
            name="drinkPhoto"
            innerRef={photoRef}
            type="string"
          ></Input>
        </FormGroup>
        <FullButton>
          <Button color="success">Add Drink</Button>
        </FullButton>
      </Form>
    </>
  );
}
