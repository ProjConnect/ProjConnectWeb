import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import avatar from '../assets/images/avatar.png';

function User() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5" />
              </CardHeader>
              <CardBody>
                <div className="author">
                  <img
                    className="avatar"
                    src={avatar}
                    alt="Avatar do usuário"
                  />
                  <h5 className="title">Roberta Veronez</h5>
                  <p className="description">@roberta123</p>
                </div>
                <p className="topic">Sobre mim</p>
                <p className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada arcu.
                </p>
                <p className="topic">Github</p>
                <p className="description">
                  <a href="https://github.com/" onClick={(e) => e.preventDefault()}>
                    https://github.com/
                  </a>
                </p>
                <p className="topic">Gitlab</p>
                <p className="description">
                  <a href="https://gitlab.com/" onClick={(e) => e.preventDefault()}>
                    https://gitlab.com/
                  </a>
                </p>
                <p className="topic">Conhecimento em linguagens</p>
                <p className="description">
                  Vestibulum urna massa, interdum sit amet tortor vitae, sagittis ultricies ligula.
                </p>
                <p className="topic">Conhecimento em tecnologias</p>
                <p className="description">
                  Donec nisi, vitae vehicula nulla facilisis sed. Proin vitae quam dui.
                </p>
                <p className="topic">Conhecimentos gerais</p>
                <p className="description">
                  Phasellus id consectetur sem, non sollicitudin ante.
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto">
                      <div className="update ml-auto mr-auto">
                        <Link to="/Editar-perfil">
                          <Button
                            className="button-round"
                          >
                            Editar perfil
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Histórico de projetos</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <Link to="/Lista-projetos"> ◉ Projconnect </Link>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Link to="/Lista-projetos"> ◉ Projeto em Sistemas de Programação </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
