/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
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
import NavBar from '../components/Navbars/Navbar';
import apiHandler from '../services/api';
import { logout } from '../services/auth';

function EditProfile() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    aboutMe: '',
    github: '',
    gitlab: '',
    languages: '',
    technologies: '',
    otherSkills: '',
  });

  // Handlers
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    apiHandler
      .post('/profile/update', form)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        // console.log(response.data);
        window.location.replace('/profile');
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // console.log(error);
        // redirecionar para página de erro dependendo do código
      });
  };

  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get('/my_profile')
        .then((response) => {
          setForm(response.data);
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 401) {
            logout();
          }
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
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
                          id="firstName"
                          value={form.firstName}
                          onChange={(e) => handleChange(e)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Sobrenome</label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={(e) => handleChange(e)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Usuário</label>
                        <Input
                          id="username"
                          value={form.username}
                          onChange={(e) => handleChange(e)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">E-mail</label>
                        <Input
                          id="email"
                          value={form.email}
                          onChange={(e) => handleChange(e)}
                          type="email"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Sobre mim</label>
                        <Input
                          id="aboutMe"
                          value={form.aboutMe}
                          onChange={(e) => handleChange(e)}
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Github</label>
                        <Input
                          id="github"
                          value={form.github}
                          onChange={(e) => handleChange(e)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Gitlab</label>
                        <Input
                          id="gitlab"
                          value={form.gitlab}
                          onChange={(e) => handleChange(e)}
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
                          id="languages"
                          value={form.languages}
                          onChange={(e) => handleChange(e)}
                          type="textarea"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimento em tecnologias</label>
                        <Input
                          id="technologies"
                          value={form.technologies}
                          onChange={(e) => handleChange(e)}
                          type="textarea"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimentos gerais</label>
                        <Input
                          id="otherSkills"
                          value={form.otherSkills}
                          onChange={(e) => handleChange(e)}
                          type="textarea"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="button-container">
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button className="button-round" onClick={handleSubmit}>
                          Atualizar perfil
                        </Button>
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
