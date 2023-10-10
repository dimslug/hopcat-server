import React, { useState } from 'react'
import InflLogin from './inflLogin/InflLogin';
import InflSignup from './inflSignup/InflSignup';
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
                        <InflSignup
                            updateToken={props.updateToken}
                        />
                    </Col>
                </Row> :
                <Row>
                    <Col md="6">
                        <InflLogin
                            updateToken={props.updateToken}
                            username={props.currentUsername}
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