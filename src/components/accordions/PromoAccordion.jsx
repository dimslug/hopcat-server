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

  const navigate = useNavigate();

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  //! UseStates
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState("1");

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
      setPromos(data.results);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  //! Delete Function
  async function deletePromo(id) {
    const url = `${baseURL}/promo/delete/${id}`;

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
        fetchPromos();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  //! Display
  const displayPromos = () => {
    console.log("DISPLAY Promo", promos);

    return (
      <div>
        {promos.map((promo) => {
          const startDateFormatter = new Date(promo.startDate);
          const startDateFomatted = startDateFormatter.toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          );
          const endDateFormatter = new Date(promo.endDate);
          const endDateFomatted = endDateFormatter.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <Accordion open={open} toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId={promo._id}>
                  {promo.promoText}
                </AccordionHeader>
                <AccordionBody accordionId={promo._id}>
                  <Card
                    style={{
                      width: "18rem",
                    }}
                  >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <p>Promo Active Between Start and End date Below</p>
                      </CardSubtitle>
                      <CardText>
                        <ul>
                          <li>Start Date: {startDateFomatted}</li>
                          <li>End Date: {endDateFomatted}</li>
                          {promo.promoPlace ? ( <li>Location: {promo.promoPlace.formattedAddress}</li>) : null}
                         
                        </ul>
                      </CardText>
                      <Button
                        color="warning"
                        onClick={() =>
                          navigate(
                            `/creator/edit?drink_id=${promo.drinkID}&currentPage=promos&promo_id=${promo._id}`
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deletePromo(promo._id)}
                        color="danger"
                      >
                        Delete
                      </Button>
                    </CardBody>
                  </Card>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    fetchPromos();
    console.log(promos);
    // displaypromos();
  }, [sessiontoken]);

  return <>{promos ? displayPromos() : null}</>;
}
