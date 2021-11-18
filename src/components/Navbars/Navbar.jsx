import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Col, Button } from 'reactstrap';
import logo from '../../assets/images/logo_transparent1-01.png';
import { logout, checkMod } from '../../services/auth';

function Header() {
  const [color] = React.useState('transparent');
  return (
    <Navbar
      expand="lg"
      className={`navbar-absolute fixed-top ${
        color === 'transparent' ? 'navbar-transparent ' : ''
      }`}
    >
      <Container fluid>
        <Col md="2">
          <div className="navbar-logo">
            <img src={logo} alt="Logo ProjConnect" />
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/project/new">Adicionar projeto</Link>
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/project/list">Lista de projetos</Link>
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/requests">Solicitações de projeto</Link>
          </div>
        </Col>
        <Col md="2">
          <div className="nav-link">
            <Link to="/profile">Meu perfil</Link>
          </div>
        </Col>
        {checkMod() ? (
          <Col md="2">
            <div className="nav-link">
              <Link to="/mod">Moderador</Link>
            </div>
          </Col>
        ) : null}
        <Col md="2">
          <div className="nav-link">
            <Button className="button-round" onClick={logout}>
              Logout
            </Button>
          </div>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;
