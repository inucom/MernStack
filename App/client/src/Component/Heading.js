import React from 'react';
import {useSelector} from "react-redux";
import firebase from "../firebase";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Heading() {
    const user = useSelector(state => state.user);
    const expand = 'false';
    const logoutHandler = () => {
        firebase.auth().signOut();
    }

    return (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid
                       style ={{
                           maxWidth: "1200px",
                           margin: "0 auto",
                       }}>
                <Navbar.Brand href="/">InuAttention</Navbar.Brand>
                {/*<Nav.Link href="/upload"*/}
                {/*          style={{marginRight:"10px"}}*/}
                {/*>Upload</Nav.Link>*/}
                {/*<Nav.Link href="/list">Styles</Nav.Link>*/}
                <div className="d-flex justify-content-end align-items-center flex-grow-1"
                     style={{marginRight: "10px"}}
                >
                    {user.accessToken ? (
                            <>
                                로그인된 계정 : <span
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    marginLeft: "7px",
                                    marginRight: '7px'
                                }}>
                    {user.displayName}
                </span>
                                <Nav>
                                    <Nav.Link onClick={() => logoutHandler()} href="/">
                                        Logout</Nav.Link>
                                </Nav>
                            </>
                        ) :
                        <Nav.Link href="/login">Login</Nav.Link>}
                </div>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr className="my-3" />
                    <Offcanvas.Body>
                        {user.accessToken ? (
                            <>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/upload">Upload</Nav.Link>
                                    <Nav.Link href="/list">Styles</Nav.Link>
                                    <Nav.Link href="/">Help</Nav.Link>
                                    <Nav.Link href="/">Setting</Nav.Link>
                                </Nav>
                            </>
                        ) : (
                            <>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/">Help</Nav.Link>
                                    <Nav.Link href="/">Setting</Nav.Link>
                                </Nav>
                            </>
                        )}

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Heading;