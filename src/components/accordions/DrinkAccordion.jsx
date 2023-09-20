import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  // let drinks = [];

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
    return drinks.length === 0 ? (
      <Button
        //  onClick={navigate("/drink/create")}
        color="dark"
      >
        Click Here To Create A Drink
      </Button>
    ) : (
      drinks.map((drink) => (
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
      ))
    );
  };

  useEffect(() => {

    fetchDrinks();
    console.log(drinks);
    // displayDrinks();
  }, [sessiontoken]);

  

  return (
    <>
      <h2>Drinks</h2>
      {
        // loading ? (
        //     <p>Loading...</p>
        // ) : (

        // drinks &&
        // drinks.length === 0 ? (
        //   <Button
        //     //  onClick={navigate("/drink/create")}
        //     color="dark"
        //   >
        //     Click Here To Create A Drink
        //   </Button>
        // ) : (
        //   drinks.map((drink) => (
        //     <Accordion open={open} toggle={toggle}>
        //       <AccordionItem>
        //         key={drink._id}
        //         <AccordionHeader targetId="1">{drink.name}</AccordionHeader>
        //         <AccordionBody accordionId="1">
        //           {drink.description}

        //           <Button
        //             color="warning"
        //             //   onClick={() => navigate(`/drink/update/${drink._id}`)}
        //           >
        //             Edit
        //           </Button>
        //           <Button
        //             //   onClick={() => deleteDrink(props.selectedDrink._id)}
        //             color="danger"
        //           >
        //             Delete
        //           </Button>
        //         </AccordionBody>
        //       </AccordionItem>
        //     </Accordion>
        //   ))
        // )

        //  )

        drinks ? displayDrinks() : null
      }
    </>
  );
}
