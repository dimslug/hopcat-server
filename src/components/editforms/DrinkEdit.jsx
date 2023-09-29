import React, { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";

export default function DrinkEdit(props) {
  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const currentPage = props.currentPage;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;
  const drinkID = props.drinkID;
  const [drinkToEdit, setDrinkToEdit] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
      setDrinkToEdit(data.results);
    } catch (err) {
      console.error(err.message);
    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrink();
  }, [sessiontoken, drinkID]);


  //! Display Edit Form
  const displayEditForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
         
          <Input id="drinkName" name="drinkName" innerRef={nameRef}/>
          <Label for="drinkName">Current Name: {drinkToEdit[0].name}</Label>
       </FormGroup>
        <FormGroup floating>
         
          <Input id="drinkCat1" name="drinkCat1" innerRef={cat1Ref} type="select">
            <option value={""}></option>
            <option value={"Beer"}>Beer</option>
            <option value={"Cocktail"}>Cocktail</option>
            <option value={"High Ball"}>High Ball</option>
            <option value={"Tumbler"}>Tumbler</option>
            <option value={"Martini"}>Martini</option>
            <option value={"IPA"}>IPA</option>
            <option value={"Ale"}>Ale</option>
            <option value={"Pilsner"}>Pilsner</option>
            <option value={"ESB"}>ESB</option>
            <option value={"Aperitif"}>Aperitif</option>
            <option value={"Shot"}>Shot</option>
          </Input>
          <Label for="drinkCat1">Current Category 1: {drinkToEdit[0].cat1}</Label>
        </FormGroup>
        <FormGroup floating>
         
          <Input id="drinkCat2" name="drinkCat2" innerRef={cat2Ref} type="select">
            <option value={""}></option>
            <option value={"Beer"}>Beer</option>
            <option value={"Cocktail"}>Cocktail</option>
            <option value={"High Ball"}>High Ball</option>
            <option value={"Tumbler"}>Tumbler</option>
            <option value={"Martini"}>Martini</option>
            <option value={"IPA"}>IPA</option>
            <option value={"Ale"}>Ale</option>
            <option value={"Pilsner"}>Pilsner</option>
            <option value={"ESB"}>ESB</option>
            <option value={"Aperitif"}>Aperitif</option>
            <option value={"Shot"}>Shot</option>
          </Input>
          <Label for="drinkCat2">Current Category 2: {drinkToEdit[0].cat2}</Label>
        </FormGroup>
        <FormGroup floating>
         
          <Input id="drinkCat3" name="drinkCat3" innerRef={cat3Ref} type="select">
            <option value={""}></option>
            <option value={"Beer"}>Beer</option>
            <option value={"Cocktail"}>Cocktail</option>
            <option value={"High Ball"}>High Ball</option>
            <option value={"Tumbler"}>Tumbler</option>
            <option value={"Martini"}>Martini</option>
            <option value={"IPA"}>IPA</option>
            <option value={"Ale"}>Ale</option>
            <option value={"Pilsner"}>Pilsner</option>
            <option value={"ESB"}>ESB</option>
            <option value={"Aperitif"}>Aperitif</option>
            <option value={"Shot"}>Shot</option>
          </Input>
          <Label for="drinkCat3">Current Category 3: {drinkToEdit[0].cat3}</Label>
        </FormGroup>
        <FormGroup floating>
         
          <Input id="drinkPrice" name="drinkPrice" innerRef={priceRef} type="number">
            {/* {ratings.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))} */}
          </Input>
          <Label for="drinkPrice">Current Price: {drinkToEdit[0].price}</Label>
        </FormGroup>
        <FormGroup floating>
          
          <Input
          id="drinkDescription"
            name="drinkDescription"
            innerRef={descriptionRef}
            type="string"
           
          ></Input>
          <Label for="drinkDescription">Current Description: {drinkToEdit[0].description}</Label>
        </FormGroup>
        {/* <FormGroup floating>
          
          <Input
          id="drinkIngredients"
            name="drinkIngredients"
            innerRef={ingredientsRef}
            type="string"
            
          ></Input> */}
          {/* {yearRange()} */}
          {/* <Label for="drinkIngredients" >{drinkToEdit[0].ingredients}</Label>
        </FormGroup> */}
        <FormGroup floating>
          
          <Input id="drinkPhoto" name="drinkPhoto" innerRef={photoRef} type="string"></Input>
          <Label for="drinkPhoto">Photo</Label>
        </FormGroup>
        <FullButton>
          <Button color="success">Edit Drink</Button>
        </FullButton>
      </Form>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  const requestBody = {};

  if (drinkToEdit[0].name !== nameRef.current.value && nameRef.current.value.trim() !== '') {
    requestBody.name = nameRef.current.value;
  }

  if (drinkToEdit[0].cat1 !== cat1Ref.current.value && cat1Ref.current.value.trim() !== '') {
    requestBody.cat1 = cat1Ref.current.value;
  }

  if (drinkToEdit[0].cat2 !== cat2Ref.current.value && cat2Ref.current.value.trim() !== '') {
    requestBody.cat2 = cat2Ref.current.value;
  }

  if (drinkToEdit[0].cat3 !== cat3Ref.current.value && cat3Ref.current.value.trim() !== '') {
    requestBody.cat3 = cat3Ref.current.value;
  }

  if (drinkToEdit[0].price !== priceRef.current.value && priceRef.current.value.trim() !== '') {
    requestBody.price = parseFloat(priceRef.current.value);
  }

  if (drinkToEdit[0].description !== descriptionRef.current.value && descriptionRef.current.value.trim() !== '') {
    requestBody.description = descriptionRef.current.value;
  }

  if (drinkToEdit[0].photo !== photoRef.current.value && photoRef.current.value.trim() !== '') {
    requestBody.photo = photoRef.current.value;
  }


    // if (drinkToEdit[0].ingredients !== ingredientsRef.current.value) {
    //   formData.append("ingredients", ingredientsRef.current.value);
    // }

    // Convert the ingredients input value to an array
  //   let existingIngredients = []
  //   console.log(drinkToEdit[0].ingredients)
  //   if (drinkToEdit[0].ingredients.length > 1) {
  //     try {
  //       existingIngredients = JSON.parse(drinkToEdit[0].ingredients)
  //       console.log(existingIngredients)
  //     } catch (error) {
  //       existingIngredients = []
  //       console.error("Error parsing existingIngredients", error)
  //     }
  //     }
    
  // let ingredientsValue = ingredientsRef.current.value;
  // if (ingredientsValue) {
  //   ingredientsValue = ingredientsValue.split(',').map(item => item.trim());
  // }

  // // Check if ingredients have changed
  // if (JSON.stringify(ingredientsValue) !== JSON.stringify(existingIngredients)) {
  //   formData.append("ingredients", JSON.stringify(ingredientsValue));
  // }


    requestBody.creatorID = creatorID

    console.log(`Data from form payload : ${JSON.stringify(requestBody)}`);

    let url = `${baseURL}/drink/edit/${drinkID}`;

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

     
      navigate("/creator/drinks");
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
  let cat1List = [];
  let cat2List = [];
  let cat3List = [];

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

  // useEffect(() => {
  //   fetchDrink();
  //   console.log(drinkToEdit);
  // }, [sessiontoken]);
  
console.log(loading)
  return (
    <>
      <h2>Edit Drink</h2>
      {loading ? (
        
        <p>Loading...</p>
      ) : drinkToEdit && drinkToEdit.length > 0 ? (
        displayEditForm()
      ) : (
        <p>No data found.</p>
      )}
    </>
  );
}
