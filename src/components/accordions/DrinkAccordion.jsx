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
import { TEInput } from "tw-elements-react"
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
                    <p>Price Range: {drink.price}</p>
                    <ul className="tw-my-1 tw-flex tw-justify-center tw-list-none tw-gap-1 tw-p-0" data-te-rating-init>
          {Array.from({ length: 5 }).map((_, index) => (
      <li key={index}>
      <span
      className={`tw-text-primary hover:tw-outline-none hover:tw-outline-primary hover:tw-transition tw-duration-300 [&>svg]:h-5 [&>svg]:w-5 ${
        drink.price >= index + 1 ? "text-warning" : "tw-outline tw-outline-primary"
      }`}
      data-te-rating-icon-ref
      // onClick={() => drink.price(index + 1)}
      >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
</svg>
        </span>
      </li>
      ))}
      </ul>
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
