import React from 'react'
import {NavLink} from "react-router-dom"
import {PATH} from '../Routes/Routes'
import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';

const Header = () => {
    return (
        <div>

            <Navbar color="light" light expand="md">
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink to={PATH.profile}>Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={PATH.login}>Sign In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={PATH.register}>Sign Up</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={PATH.renew}>Renew Password</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={PATH.setPassword}>Set Password</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to={PATH.packs}>Packs</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

        </div>
    )
}
export default Header