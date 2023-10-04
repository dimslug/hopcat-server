import React, { useRef, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { TEInput } from "tw-elements-react"
import { useNavigate } from "react-router-dom";
import FullButton from "../buttons/FullButton";
import { baseURL } from "../../environments";

export default function DrinkCreate(props) {
  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const currentPage = props.currentPage;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;

  const navigate = useNavigate();

  
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState('')
  const handlePrimaryCategoryChange = (e) => {
    setSelectedPrimaryCategory(e.target.value)
    console.log(selectedPrimaryCategory)
  }

  let cat1List = [null, "Beer/Fermented Beverage", "Mixed Drink/Liquor"];
  let cat2ListA = [null, "Ale", "Barley Wine", "Brown Ale", "Cider", "ESB", "IPA", "Lager", "Lambic", "Pale Ale", "Pilsner", "Porter", "Sake", "Sour Ale", "Stout", "Wheat Beer"];
  let cat2ListB = [null, "Ancestrals", "Champagne Cocktails", "Collinses and Fizzs", "Duos & Trios", "Flips & Nogs", "Highballs", "Hot Drinks (Toddys)", "Juleps & Smashes", "Punch", "Sours", "Tropical-Style"];

const [selectedPrice, setSelectedPrice] = useState(0);

  const handlePriceSelect = (value) => {
    setSelectedPrice(value);
    console.log(selectedPrice)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const creatorID = creatorID
    const name = nameRef.current.value;
    const cat1 = cat1Ref.current.value;
    const cat2 = cat2Ref.current.value;
    const price = selectedPrice;
    const description = descriptionRef.current.value;
    const photo = photoRef.current.value;

    let body = JSON.stringify({
      creatorID,
      name,
      cat1,
      cat2,
      price,
      description,
      photo,

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

      console.log(data);
      navigate("/creator/drinks");
    } catch (err) {
      console.error(err.message);
    }
  };

  const nameRef = useRef();
  const cat1Ref = useRef();
  const cat2Ref = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const photoRef = useRef();


  return (
    <>
      {console.log(props)}
      <h2>New Drink</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input name="drinkName" innerRef={nameRef} />
        </FormGroup>
        <FormGroup>
          <Label>Primary Category</Label>
          <Input name="drinkCat1" innerRef={cat1Ref} type="select" onChange={handlePrimaryCategoryChange}>
            {cat1List.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Secondary Category</Label>
          <Input name="drinkCat2" innerRef={cat2Ref} type="select">
            {selectedPrimaryCategory === "Beer/Fermented Beverage"
              ? cat2ListA.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))
              : selectedPrimaryCategory === "Mixed Drink/Liquor"
              ? cat2ListB.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))
              : null}
          </Input>
        </FormGroup>
<Label>Price</Label>
        <TEInput
        type="number"
        id="priceRef"
        label="Price"
        innerRef={priceRef}
        class="tw-my-1 tw-flex tw-list-none tw-gap-1 tw-p-0"
        data-te-rating-init
        >
        <ul className="tw-flex tw-justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
      <li key={index}>
      <span
      className={`tw-text-primary [&>svg]:h-5 [&>svg]:w-5 ${
        selectedPrice >= index + 1 ? "text-warning" : "text-white"
      }`}
      data-te-rating-icon-ref
      onClick={() => handlePriceSelect(index + 1)}
      >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
</svg>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="tw-mr-1 tw-h-5 tw-w-5"
          >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg> */}
        </span>
      </li>
      ))}
      </ul>
      </TEInput>

     

      {/* <li>
      <span
      class="text-primary [&>svg]:h-5 [&>svg]:w-5"
      data-te-rating-icon-ref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-1 h-5 w-5 text-danger">
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        </span>
      </li>
      <li>
      <span
      class="text-primary [&>svg]:h-5 [&>svg]:w-5"
      data-te-rating-icon-ref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-1 h-5 w-5 text-danger">
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        </span>
      </li>
      <li>
      <span
      class="text-primary [&>svg]:h-5 [&>svg]:w-5"
      data-te-rating-icon-ref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mr-1 h-5 w-5 text-danger">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        </span>
      </li>
      <li>
      <span
      class="text-primary [&>svg]:h-5 [&>svg]:w-5"
      data-te-rating-icon-ref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="mr-1 h-5 w-5 text-danger">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        </span>
      </li>
    </ul> */}
    {/* </div> */}

         
         
        <FormGroup>
          <Label>Description</Label>
          <Input
            name="drinkDescription"
            innerRef={descriptionRef}
            type="string"
          ></Input>
        </FormGroup>
        {/* <FormGroup>
          <Label>Ingredients</Label>
          <Input
            name="drinkIngredients"
            innerRef={ingredientsRef}
            type="string"
          ></Input>
        </FormGroup> */}
        <FormGroup>
          <Label>Photo</Label>
          <Input name="drinkPhoto" innerRef={photoRef} type="string"></Input>
        </FormGroup>
        <FullButton>
          <Button color="success">Add Drink</Button>
        </FullButton>
      </Form>
    </>
  );
}
