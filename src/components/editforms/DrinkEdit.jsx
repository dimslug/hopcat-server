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
  
  const navigate = useNavigate();

  //! UseStates
  const [drinkToEdit, setDrinkToEdit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(0);

  
  //! Primary Category & Price Selector event handlers
  const handlePrimaryCategoryChange = (e) => {
    setSelectedPrimaryCategory(e.target.value)
    console.log(selectedPrimaryCategory)
  }

  const handlePriceSelect = (value) => {
    setSelectedPrice(value);
    console.log(selectedPrice)
  }

  let cat1List = [null, "Beer/Fermented Beverage", "Mixed Drink/Liquor"];
  let cat2ListA = [null, "Ale", "Barley Wine", "Brown Ale", "Cider", "ESB", "IPA", "Lager", "Lambic", "Pale Ale", "Pilsner", "Porter", "Sake", "Sour Ale", "Stout", "Wheat Beer"];
  let cat2ListB = [null, "Ancestrals", "Champagne Cocktails", "Collinses and Fizzs", "Duos & Trios", "Flips & Nogs", "Highballs", "Hot Drinks (Toddys)", "Juleps & Smashes", "Punch", "Sours", "Tropical-Style"];

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
      console.log(data.results)
      console.log(`Inside Fetch Drink: ${selectedPrice}`)
      setLoading(false);
      console.log(drinkToEdit[0].price)
      if (!loading) {
        setSelectedPrice(drinkToEdit[0].price)
      }
    } catch (err) {
      console.error(err.message);
    // } finally {
     
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
         
          <Input id="drinkCat1" name="drinkCat1" innerRef={cat1Ref} type="select" onChange={handlePrimaryCategoryChange}>
          {cat1List.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </Input>
          <Label for="drinkCat1">Current Primary Category: {drinkToEdit[0].cat1}</Label>
        </FormGroup>
        <FormGroup floating>
          <Input id="drinkCat2" name="drinkCat2" innerRef={cat2Ref} type="select">
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
          <Label for="drinkCat2">Current Secondary Category: {drinkToEdit[0].cat2}</Label>
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
        <div class="tw-mb-3">
  <label
    for="photoRef"
    class="tw-mb-2 tw-inline-block tw-text-neutral-700 tw-dark:text-neutral-200"
    >Photo
    </label>
  <input
    class="tw-relative tw-m-0 tw-block tw-w-full tw-min-w-0 tw-flex-auto tw-rounded tw-border tw-border-solid tw-border-neutral-300 tw-bg-clip-padding tw-px-3 tw-py-[0.32rem] tw-text-base tw-font-normal tw-text-neutral-700 tw-transition tw-duration-300 tw-ease-in-out tw-file:-mx-3 tw-file:-my-[0.32rem] tw-file:overflow-hidden tw-file:rounded-none tw-file:border-0 tw-file:border-solid tw-file:border-inherit tw-file:bg-neutral-100 tw-file:px-3 tw-file:py-[0.32rem] tw-file:text-neutral-700 tw-file:transition tw-file:duration-150 tw-file:ease-in-out tw-file:[border-inline-end-width:1px] tw-file:[margin-inline-end:0.75rem] tw-hover:file:bg-neutral-200 tw-focus:border-primary tw-focus:text-neutral-700 tw-focus:shadow-te-primary tw-focus:outline-none tw-dark:border-neutral-600 tw-dark:text-neutral-200 tw-dark:file:bg-neutral-700 tw-dark:file:text-neutral-100 tw-dark:focus:border-primary"
    type="file"
    id="photoRef" />
</div>

<Label>Price</Label>
    
    <ul className="tw-my-1 tw-flex tw-justify-center tw-list-none tw-gap-1 tw-p-0" data-te-rating-init>
      {Array.from({ length: 5 }).map((_, index) => (
  <li key={index}>
  <span
  className={`tw-text-primary hover:tw-outline-none hover:tw-outline-primary hover:tw-transition tw-duration-300 [&>svg]:h-5 [&>svg]:w-5 ${
    selectedPrice >= index + 1 ? "text-warning" : "tw-outline tw-outline-primary"
  }`}
  data-te-rating-icon-ref
  onClick={() => handlePriceSelect(index + 1)}
  >
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
<path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
</svg>
    </span>
  </li>
  ))}
  </ul>
       
       
        <FullButton>
          <Button color="success">Edit Drink</Button>
        </FullButton>
      </Form>
    );
  };

  //! Handle Submit
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

  if (drinkToEdit[0].price !== selectedPrice && selectedPrice !== '') {
    requestBody.price = parseFloat(selectedPrice);
  }

  if (drinkToEdit[0].description !== descriptionRef.current.value && descriptionRef.current.value.trim() !== '') {
    requestBody.description = descriptionRef.current.value;
  }

  // if (drinkToEdit[0].photo !== photoRef.current.value && photoRef.current.value.trim() !== '') {
  //   requestBody.photo = photoRef.current.value;
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
  const descriptionRef = useRef();
  const photoRef = useRef();

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
