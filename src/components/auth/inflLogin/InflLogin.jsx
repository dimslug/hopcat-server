import React, { useRef } from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';

function InflLogin( {updateToken} ) {

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        let body = JSON.stringify({
            email, password
        })

        const url = 'http://localhost:4010/influencer/login';

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: body
            })

            const data = await res.json();
            
            if (data.message === 'success') {
                updateToken(data.token)
                navigate('/inflHome')
            }
        } catch (err) {
            console.log(err.message)
        }

    }

    return (
        <>
        <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup floating>
                    <Input 
                        innerRef={emailRef}
                        type='email'
                        name='email'
                        placeholder='Email'
                        id='email'
                    />
                    <Label for='email'>
                        Email
                    </Label>
                </FormGroup>
                <FormGroup>
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
                <Button type='submit' color='dark'>Login</Button>
            </Form>
        </>
    )
}

export default InflLogin