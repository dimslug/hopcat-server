import React from 'react'
import { Col, Navbar, Row, } from 'reactstrap'

export default function Footer() {

    const currentYear = new Date().getFullYear();


    return (
        <>
            <footer>
                <h6>Upright Project: HopSpot {currentYear} &copy;</h6>
            </footer>
        </>
    )
}

