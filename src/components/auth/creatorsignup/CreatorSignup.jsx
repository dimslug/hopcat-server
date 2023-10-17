import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FullButton from "../../buttons/FullButton";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../environments";

function Signup(props) {
  // const [socialCounter, setSocialCounter] = useState(1)
  // const handleClick = () => {
  //     setSocialCounter(socialCounter + 1);

  // }
  // const socialsArray = []

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // const socialsRef = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    // const socials = socialsRef.current.value;

    let body = JSON.stringify({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      //!! Array
      // socials: socials
    });

    const url = `${baseURL}/creator/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();

      if (data.message === "Success!") {
        props.updateToken(data.token);
        navigate("/creator/frontpage");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <h2>Creator Signup</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            id="usernameSignup"
            innerRef={usernameRef}
            placeholder="your username here"
            name="username"
            type="text"
          />
        
          <Label for="usernameSignup">Username</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="firstNameSignup"
            innerRef={firstNameRef}
            placeholder="your first name here"
            name="firstName"
            type="text"
          />
          <Label for="firstNameSignup">First Name</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="lastNameSignup"
            innerRef={lastNameRef}
            placeholder="your last name here"
            name="lastName"
            type="text"
          />
          <Label for="lastNameSignup">Last Name</Label>
        </FormGroup>

        {/* <FormGroup>
                    <Label>Socials</Label>
                    {Array.from(Array(socialCounter)).map((i, index) => {
                    return <Input
                        innerRef={socialsRef}
                        type='url'
                   
                    />
                })}
                    <button onClick={handleClick}>Add Another Social</button>
                </FormGroup> */}

        <FormGroup floating>
          <Input
            id="emailSignup"
            innerRef={emailRef}
            placeholder="your email here"
            name="email"
            type="email"
          />
          <Label for="emailSignup">email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="passwordSignup"
            innerRef={passwordRef}
            placeholder="your password here"
            name="password"
            type="password"
          />
          <Label for="passwordSignup">Password</Label>
        </FormGroup>
        <FullButton>
          <Button type="submit">Signup</Button>
        </FullButton>
      </Form>
    </>
  );
}

export default Signup;
