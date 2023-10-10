import React, { useRef } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';

function InflSignup( {updateToken} ) {

    const usernameRef = useRef();
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const dateOfBirthRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const dateOfBirth = dateOfBirthRef.current.value;
        const password = passwordRef.current.value;

        let body = JSON.stringify({
            username, email, firstName, lastName, dateOfBirth, password
        })

        const headers = new Headers();
        headers.append('Content-type', 'application/json')

        const requestOptions = {
            headers,
            body: body,
            method: 'POST'
        }

        const url = 'http://localhost:4010/influencer/signup';

        try {
            const res = await fetch(url, requestOptions)
            const data = await res.json()

            if(data.message === 'success') {
                updateToken(data.token)
                navigate('/inflHome')
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup floating>
                    <Input type="text"
                        innerRef={usernameRef}
                        id='username'
                        name='username'
                        placeholder='Username'
                    />
                    <Label for='username'>
                        Username
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='email'
                        innerRef={emailRef}
                        id='email'
                        name='email'
                        placeholder='Email'
                    />
                    <Label for='email'>
                        Email
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='text'
                        innerRef={firstNameRef}
                        id='firstname'
                        name='firstname'
                        placeholder='First Name'
                    />
                    <Label for='firstname'>
                        First Name
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='text'
                        innerRef={lastNameRef}
                        id='lastname'
                        name='lastname'
                        placeholder='Last Name'
                    />
                    <Label for='lastname'>
                        Last Name
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='date'
                        innerRef={dateOfBirthRef}
                        id='dateOfBirth'
                        name='dateOfBirth'
                    />
                    <Label for='dateOfBirth'>
                        Date of Birth
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input
                        innerRef={passwordRef}
                        id='password'
                        name='password'
                        placeholder='Password'
                        type='password'
                    />
                    <Label for='password'>
                        Password
                    </Label>
                </FormGroup>
                <Button type='submit' color='dark'>Sign Up</Button>
            </Form>
        </>
    )
}

export default InflSignup