import React, { useRef, useState } from 'react';
import { FormGroup, Input, Form, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import FullButton from '../../buttons/FullButton';
import { baseURL } from '../../../environments'



// Login component to provide token from matching email and password
function Login({ updateToken }, {}) {

    let email = ''
    let password = ''

    const emailRef = useRef();
    const passwordRef = useRef();
    
    const navigate = useNavigate();
    const [ emailState, setEmailState ] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        email = emailRef.current.value;
        password = passwordRef.current.value;
        setEmailState(email)
  
        let bodyObj = JSON.stringify({
            email, password
        })

        const url = `${baseURL}/creator/login`;

        try {
            
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: bodyObj
            })

            const data = await res.json();

          
            if (data.message === 'Success!') {
            
                updateToken(data.token)
                navigate('/creator/frontpage')
            
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error(err.message)
        }

       
    }

    return (
        <>
            <h2>Creator Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup >
                    <Input
                        innerRef={emailRef}
                        type='email'
                        placeholder='you@email.com'
                    />
                </FormGroup>
                <FormGroup >
                    <Input
                        innerRef={passwordRef}
                        type='password'
                    />
                </FormGroup>
                <FullButton>
                    <Button type='submit'>Login</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default Login