import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'http://localhost:3000';
}

const Header = ({ setCategoria }) => {

  const isLoggedIn = !!localStorage.getItem('user');

  let menuActions = null;

  if (isLoggedIn) {
    menuActions =
      <React.Fragment><Nav className="grey-link">
        <Link to="/upload">Upload</Link>
      </Nav>
        <p>&nbsp;&nbsp;&nbsp;</p>

        <Nav className="grey-link">
          <Link to="/" onClick={logout}>Logout</Link>
        </Nav></React.Fragment>;
  } else {
    menuActions =
      <React.Fragment>
        <Nav className="grey-link">
          <Link to="/login">Login</Link>
        </Nav></React.Fragment>;
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="grey-link"><Link to="/">FotOriginal</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Categorias" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setCategoria('')}>Todas</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('animais')}>Animais</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('arquitetura')}>Arquitetura</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('desporto')}>Desporto</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('natureza')}>Natureza</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('noite')}>Noite</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('retrato')}>Retrato</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setCategoria('outra')}>Outra</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {menuActions}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )

}

export default Header;
