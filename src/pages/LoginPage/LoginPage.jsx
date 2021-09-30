import React from 'react';
import './LoginPage.css';
import { GoogleLogin } from 'react-google-login';
import logo from '../../assets/images/logo_transparent.png';

function LoginPage() {
  return (
    <div className="background">
      <div className="rightDiv">
        <div className="box">
          <img src={logo} className="logo" alt="ProjConnect's logo" />
          <p className="text">
            O ProjConnect é uma plataforma de compartilhamento de ideias de
            projetos de computação destinada à comunidade da Unicamp. Clique no
            botão abaixo para acessar sua conta através do email institucional.
          </p>
          <GoogleLogin
            buttonText="Fazer login com Google"
            style={{
              backgroundColor: '#6490dd',
              color: '#ffffff',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
