import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function Logout({ setSessionToken }) {
    const navigate = useNavigate();
  
    const signout = () => {

   

    localStorage.removeItem("token");
    setSessionToken("");
    navigate("/");
  };

  const style = {
    float: 'right',
    margin: '.5em'
  }

  return (
    <>
      <Button color="danger" outline style={style} onClick= {signout}>
        Signout
      </Button>
    </>
  );
}

export default Logout