import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './LandingPage.css';
import logo from '../../assets/images/logo_transparent.png';
import landingpage from '../../assets/images/landingpage.png';

function LandingPage() {
  return (
    <div className="background">
      <div className="leftDiv">
        <img
          src={landingpage}
          className="leftImage"
          alt="Person using their computer"
        />
      </div>
      <div className="rightDiv">
        <img src={logo} className="logo" alt="ProjConnect's logo" />
        <p className="text">
          O ProjConnect é uma plataforma onde qualquer pessoa identificada na
          Unicamp pode criar uma demanda de projeto que possa ser atendido pela
          disciplina de projetos.
        </p>
        <Link to="/project/list">
          <Button className="button-round">Entrar</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
