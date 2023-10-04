import React, { useEffect, useState } from 'react';
import '../../index.css'
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
  
   const sessiontoken = args.sessiontoken
   const setSessionToken = args.setSessionToken
   const creatorID = args.creatorID
   const setCreatorID = args.setCreatorID

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar className="navbar-custom navbarcustom" {...args}>
        <NavbarBrand className="navbarcustom navbar-brand" href="/">HopSpot</NavbarBrand>
        <NavbarToggler className="navbarcustom navbar-toggler" onClick={toggle}>
        <div className='navbar-toggler-icon'></div>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto custom-collapse" navbar>
            
            
            <NavItem>
              <NavLink href="/creator/drinks">Drinks</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/creator/promos">Promos</NavLink>
            </NavItem>
           
            <NavItem>
              
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink> */}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Settings
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <NavbarText>Simple Text</NavbarText> */}
            {sessiontoken !== "" ? (
      <Logout
       setSessionToken={setSessionToken}
       setCreatorID={setCreatorID}
        />
    ) : null}
          </Nav >
         
        </Collapse>
        {/* <Nav justified
  >
          <NavItem>
    <NavLink
      active
      href="#"
    >
      Link
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#">
      Another Link
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      disabled
      href="#"
    >
      Disabled Link
    </NavLink>
  </NavItem>
          </Nav> */}
      </Navbar>
    </>
  );
}

export default HopSpotNav;