import React from 'react';
import './LoginPage.css';
import { GoogleLogin } from 'react-google-login';
import logo from '../../assets/images/logo_transparent.png';

function LoginPage() {
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
          <GoogleLogin buttonText="Fazer login com Google" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
