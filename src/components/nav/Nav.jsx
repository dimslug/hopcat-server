import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import Logout from '../auth/logout/Logout';


function HopSpotNav(args) {
    
    const [sessionToken, setSessionToken] = useState('')

    const updateToken = newToken => {
        localStorage.setItem('token', newToken);
        setSessionToken(newToken);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setSessionToken(localStorage.getItem('token'))
        }
    }, [])

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args}>
                <NavbarBrand href="/">HopSpot</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                Promos
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {sessionToken !== "" ? (
                            <Logout
                                setSessionToken={setSessionToken} />
                        ) : null}
                    </Nav >
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
                
            </Navbar>
        </div>
    );
}

export default HopSpotNav;