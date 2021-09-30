/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';

function EditProfile() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Editar perfil</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Nome</label>
                        <Input
                          defaultValue="Roberta"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Sobrenome</label>
                        <Input
                          defaultValue="Veronez"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Usuário</label>
                        <Input
                          defaultValue="roberta123"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          E-mail
                        </label>
                        <Input
                          defaultValue="roberta123@dac.unicamp.br"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Sobre mim</label>
                        <Input
                          type="textarea"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada arcu a ex tempus, sed gravida magna sagittis. Morbi in euismod mi, vel cursus turpis."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Github</label>
                        <Input
                          defaultValue="https://github.com/"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Gitlab</label>
                        <Input
                          defaultValue="https://gitlab.com/"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimento em linguagens</label>
                        <Input
                          type="textarea"
                          defaultValue="Vestibulum urna massa, interdum sit amet tortor vitae, sagittis ultricies ligula."
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimento em tecnologias</label>
                        <Input
                          type="textarea"
                          defaultValue="Donec nisi, vitae vehicula nulla facilisis sed. Proin vitae quam dui."
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimentos gerais</label>
                        <Input
                          type="textarea"
                          defaultValue="Phasellus id consectetur sem, non sollicitudin ante. Aliquam molestie fringilla velit, vitae feugiat lacus ullamcorper quis."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="button-container">
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Link to="/Perfil">
                          <Button
                            className="button-round"
                          >
                            Atualizar perfil
                          </Button>
                        </Link>
                      </div>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditProfile;
