import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Container,
  Col,
} from 'reactstrap';
import logo from '../../assets/images/logo_transparent1-01.png';

function Header() {
  const [color] = React.useState('transparent');
  return (
    <Navbar
      expand="lg"
      className={
          `navbar-absolute fixed-top ${
            color === 'transparent' ? 'navbar-transparent ' : ''}`
      }
    >
      <Container fluid>
        <Col md="2">
          <div className="navbar-logo">
            <img src={logo} alt="Logo ProjConnect" />
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/Lista-projetos">Lista de projetos</Link>
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/Perfil">Meu perfil</Link>
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/Login">Logout</Link>
          </div>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;
