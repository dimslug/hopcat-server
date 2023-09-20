import React, { useState } from 'react'
import CreatorSignup from './creatorsignup/CreatorSignup'
import CreatorLogin from './creatorlogin/CreatorLogin';
import { Button, Col, Container, Row } from 'reactstrap';

function Auth(props) {

    const [button, setButton] = useState('Signup')

    const swapForm = () => {
        button === "Login" ?
            setButton('Signup') :
            setButton('Login')
    }

    const displayForm = () => {
        return (
            button === "Login" ?
                <Row>
                    <Col md="6">
                        <CreatorSignup
                            updateToken={props.updateToken}
                            updateCreatorID={props.updateCreatorID}
                        />
                    </Col>
                </Row> :
                <Row>
                    <Col md="6">
                        <CreatorLogin
                            updateToken={props.updateToken}
                            updateCreatorID={props.updateCreatorID}
                        />
                    </Col>
                </Row>
        )
    }

    return (
        <>
           
            <Container>
                {displayForm()}
                <Button onClick={swapForm} color='dark'>{button}</Button>
            </Container>
            
        </>
    )
}

export default Auth