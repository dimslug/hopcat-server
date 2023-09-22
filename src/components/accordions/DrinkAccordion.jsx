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
  console.log(creatorID);
  console.log(`currentPage, ${currentPage}`);
  

  // let drinks = [];
  const navigate = useNavigate()
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

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

  //! Display
  const displayDrinks = () => {
    console.log("DISPLAY DRINK", drinks);

    return drinks.map((drink) => (
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId={drink._id}>{drink.name}</AccordionHeader>
            <AccordionBody accordionId={drink._id}>
              <Card
                style={{
                  width: "18rem",
                }}
              >
                <img alt="Sample" src="https://picsum.photos/300/200" />
                <CardBody>
                  {/* <CardTitle tag="h5">
      Card title
    </CardTitle> */}
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
                    
                      onClick={() => navigate(`/promo/create?drink_id=${drink._id}`)}
                  >
                    Promote
                  </Button>
                  <Button
                    color="warning"
                    //   onClick={() => navigate(`/drink/update/${drink._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    //   onClick={() => deleteDrink(props.selectedDrink._id)}
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
