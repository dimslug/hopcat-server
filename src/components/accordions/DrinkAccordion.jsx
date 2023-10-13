import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Button,
} from "reactstrap";
import { baseURL } from "../../environments";
import { useNavigate } from "react-router-dom";

export default function DrinkAccordion({
  setSessionToken,
  sessiontoken,
  setCreatorID,
  creatorID,
  currentPage,
}) {

  setCreatorID(localStorage.creatorID);

  const navigate = useNavigate()
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  //! UseStates
 
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState("1");
  
  

  //! Fetch Drinks
  const fetchDrinks = async () => {
    const url = `${baseURL}/drink/creations/${localStorage.creatorID}`;
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
      // console.log(drinks);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  //! Delete Function
  async function deleteDrink(id) {
    const url = `${baseURL}/drink/delete/${id}`;

    let requestOption = {
      headers: new Headers({
        Authorization: sessiontoken,
      }),
      method: "DELETE",
    };
    try {
      let res = await fetch(url, requestOption);
      let data = await res.json();

      if (data) {
        fetchDrinks();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  //! Display
  const displayDrinks = () => {
    console.log("DISPLAY DRINK", drinks);

    return drinks.map((drink) => (
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId={drink._id}>{drink.name}</AccordionHeader>
            <AccordionBody accordionId={drink._id}>
              <Card className="card"
                style={{
                  width: "18rem",
                }}
              >
                <img alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    <p>{drink.description}</p>
                  </CardSubtitle>
                  <CardText>
                    <ul>
                      <li>{drink.cat1}</li>
                      <li>{drink.cat2}</li>
                      <li>{drink.cat3}</li>
                    </ul>
                    <p> Ingredients: {drink.ingredients}</p>
                    <p>Price Range: {drink.price}</p>
                  </CardText>
                  <Button
                    color="info"
                      currentPage={'promos'}
                      onClick={() => navigate(`/creator/create?drink_id=${drink._id}&currentPage=promos`)}
                  >
                    Promote
                  </Button>
                  <Button
                    color="warning"
                      onClick={() => navigate(`/creator/edit?drink_id=${drink._id}&currentPage=drinks`)}
                  >
                    Edit
                  </Button>
                  <Button
                      onClick={() => deleteDrink(drink._id)}
                    color="danger"
                  >
                    Delete
                  </Button>
                </CardBody>
              </Card>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      ));
    
  };

  useEffect(() => {
    fetchDrinks();
    console.log(drinks);
    // displayDrinks();
  }, [sessiontoken]);

  return <>{drinks ? displayDrinks() : null}</>;
}
