import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./css/navbar.css"
import { Button } from 'bootstrap';
import { FileEarmarkPdf } from "react-bootstrap-icons";
import { getID } from '../services/getTokenId';
import { useNavigate } from 'react-router-dom';

const navbar = () => {
  const [id, setId] = useState(null)
  const getId = getID()

  getId.then((token) => {
    setId(token)
  }).catch((error) => {
    console.error("Error fetching token:", error);
  });
  const Navigate = useNavigate()
  return (
    <div>
      <Navbar expand="lg" className="custom">
        <Container>
          <Navbar.Brand className='navHead' href="#home"><FileEarmarkPdf />Scraper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto  navicon">
              <Nav.Link href="/" style={{ float: 'right', color: "#fff" }}>Home </Nav.Link>

              {id ? (
                <Nav.Link href="/login" className="ml-auto" style={{ float: 'right', color: '#fff' }} onClick={() => 
                  {
                    localStorage.clear();
                    Navigate("/")
                  }}>
                  Log Out
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/login" className="ml-auto" style={{ float: 'right', color: '#fff' }}>
                    Sign In
                  </Nav.Link>
                  <Nav.Link href="/register" className="ml-auto" style={{ float: 'right', color: '#fff', border: '2px solid #fff', borderRadius: '10px' }}>
                    Sign Up
                  </Nav.Link>
                </>
              )}



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default navbar
