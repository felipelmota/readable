import React from 'react';
import { Navbar } from 'react-bootstrap';

const NavbarHeader = () => {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Projeto Leitura</a>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    );
};

export default NavbarHeader;

