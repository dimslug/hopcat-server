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
import { useNavigate } from "react-router-dom";
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
  

  // let drinks = [];

  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  //! Fetch Promos
  const fetchPromos = async () => {
    const url = `${baseURL}/promo/${localStorage.creatorID}`;
    const requestOption = {
      method: "GET",
      headers: new Headers({
        Authorization: sessiontoken,
      }),
    };
    try {
      const res = await fetch(url, requestOption);
      const data = await res.json();
      // promos = data.results;
      setPromos(data.results);
      // console.log(data);
      // console.log(promos);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  //! Display
  const displayPromos = () => {
    console.log("DISPLAY Promo", promos);

    return promos.map((promo) => (
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId={promo._id}>{promo.promoText}</AccordionHeader>
            <AccordionBody accordionId={promo._id}>
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
                    <p>Promo Active Between Start and End date Below</p>
                  </CardSubtitle>
                  <CardText>
                    <ul>
                      <li>Start Date: {promo.startDate}</li>
                      <li>End Date: {promo.endDate}</li>
                    
                    </ul>
               
                  </CardText>
                  {/* <Button
                    color="warning"
                    //   onClick={() => navigate(`/promo/update/${promo._id}`)}
                  >
                    Edit
                  </Button> */}
                  <Button
                    color="warning"
                      onClick={() => navigate(`/creator/edit?drink_id=${promo.drinkID}&currentPage=promos&promo_id=${promo._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    //   onClick={() => deletepromo(props.selectedpromo._id)}
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
    fetchPromos();
    console.log(promos);
    // displaypromos();
  }, [sessiontoken]);

  return <>{promos ? displayPromos() : null}</>;
}
