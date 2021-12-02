/* eslint-disable jsx-a11y/label-has-associated-control, object-curly-newline */
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
import CloseIcon from '@material-ui/icons/Close';
import Avatars from '../components/Avatars/Avatars';
import NavBar from '../components/Navbars/Navbar';
import ImageSelect from '../components/ImageSelect/ImageSelect';
import apiHandler from '../services/api';
import { logout } from '../services/auth';

function EditProfile() {
  const avatars = Avatars;
  const [dialog, setDialog] = useState(false);
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
    avatar: null,
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

  const [langs, setLangs] = useState([]);
  const [techs, setTechs] = useState([]);
  const [skills, setSkills] = useState([]);

  const addTags = (event, id, tags, setter) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setter([...tags, event.target.value]);
      setForm({
        ...form,
        [id]: tags,
      });
      // event.target.value = '';
    }
  };

  const removeTags = (tag, id, tags, setter) => {
    setter([...tags.filter((t) => t !== tag)]);
    setForm({
      ...form,
      [id]: tags,
    });
  };

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
                          required
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
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="2">
                      <FormGroup>
                        <label>Usuário</label>
                        <Input
                          id="username"
                          value={form.username}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">E-mail</label>
                        <Input
                          id="email"
                          value={form.email}
                          onChange={(e) => handleChange(e)}
                          type="email"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="2">
                      <FormGroup>
                        <Button
                          className="button-round-centered"
                          onClick={() => setDialog(true)}
                        >
                          Escolher Avatar
                        </Button>
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
                        <div className="tags-input">
                          <ul>
                            {langs.map((tag) => (
                              <li>
                                <span>{tag}</span>
                                <Button
                                  onClick={() => removeTags(
                                    tag,
                                    'languages',
                                    langs,
                                    setLangs,
                                  )}
                                >
                                  <CloseIcon />
                                </Button>
                              </li>
                            ))}
                          </ul>
                          <input
                            type="text"
                            onKeyUp={(event) => addTags(
                              event, 'languages', langs, setLangs,
                            )}
                            placeholder="Pressione a tecla Enter para adicionar tag"
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimento em tecnologias</label>
                        <div className="tags-input">
                          <ul>
                            {techs.map((tag) => (
                              <li>
                                <span>{tag}</span>
                                <Button
                                  onClick={() => removeTags(
                                    tag,
                                    'technologies',
                                    techs,
                                    setTechs,
                                  )}
                                >
                                  <CloseIcon />
                                </Button>
                              </li>
                            ))}
                          </ul>
                          <input
                            type="text"
                            onKeyUp={(event) => addTags(event, 'technologies', techs, setTechs)}
                            placeholder="Pressione a tecla Enter para adicionar tag"
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label>Conhecimentos gerais</label>
                        <div className="tags-input">
                          <ul>
                            {skills.map((tag) => (
                              <li>
                                <span>{tag}</span>
                                <Button
                                  onClick={() => removeTags(
                                    tag,
                                    'otherSkills',
                                    skills,
                                    setSkills,
                                  )}
                                >
                                  <CloseIcon />
                                </Button>
                              </li>
                            ))}
                          </ul>
                          <input
                            type="text"
                            onKeyUp={(event) => addTags(event, 'otherSkills', skills, setSkills)}
                            placeholder="Pressione a tecla Enter para adicionar tag"
                          />
                        </div>
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
      <ImageSelect
        dialog={dialog}
        setDialog={setDialog}
        form={form}
        setForm={setForm}
        value="avatar"
        imageSet={avatars}
        description="Selecione o avatar desejado"
      />
    </>
  );
}

export default EditProfile;
