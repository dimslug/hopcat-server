import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import '../../../App.css'

function Logout({ setSessionToken, setCreatorID }) {

    const navigate = useNavigate();
  
    const signout = () => {

   

    localStorage.removeItem("token");
    setSessionToken("");
    localStorage.removeItem("creatorID")
    setCreatorID("");
    navigate("/");
  };

  const style = {
    float: 'right',
    margin: '.5em'
  }

  return (
    <>
      <Button class="custom-button" 
      color="danger" 
      // outline style={style} 
      
      onClick= {signout}>
        Signout
      </Button>
    </>
  );

}

export default Logout