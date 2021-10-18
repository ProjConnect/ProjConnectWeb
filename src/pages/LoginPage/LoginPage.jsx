import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleButton from 'react-google-button';

import './LoginPage.css';
import logo from '../../assets/images/logo_transparent.png';
import apiHandler from '../../services/api';

function LoginPage() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    apiHandler
      .get('/status')
      .then((response) => {
        if (response.data === 'logged') {
          setIsLogged(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLogged) {
    return <Redirect to="/project/list" />;
  }
  return (
    <div className="login-background">
      <div className="center-div">
        <div className="box">
          <div className="logo-div">
            <img src={logo} className="login-logo" alt="ProjConnect's logo" />
          </div>
          <p className="login-text">
            O ProjConnect é uma plataforma de compartilhamento de ideias de
            projetos de computação destinada à comunidade da Unicamp. Clique no
            botão abaixo para acessar sua conta através do email institucional.
          </p>
          <GoogleButton
            label="Fazer login com Google"
            onClick={() => window.location.assign('/api/login')}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
