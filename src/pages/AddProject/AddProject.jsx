/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/LandingPage.css';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  FormText,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

const tags = [
  'Figma',
  'HTML/CSS',
  'PHP',
  'Javascript',
  'React.js',
  'Angular.js',
  'Vue.js',
  'Express.js',
  'Laravel',
  'Spring Boot',
  'Ruby on Rails',
  'Django',
  'Java',
  'C',
  'C++',
  'Python',
  'Go',
  'Rust',
  'Lisp',
  'Elixir',
  'COBOL',
  'FORTRAN',
  'Swift',
  'Kotlin',
  'Flutter',
  'Ionic',
  'React Native',
  'Ruby',
  'Docker',
  'Kubernetes',
  'AWS',
  'GCP',
  'Azure',
  'MongoDB',
  'MariaDB',
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'Firebase',
];

function AddProject() {
  const [checkedBoxes, setCheckedBoxes] = useState(new Array(tags.length).fill(false));
  const [subject, setSubject] = useState('');
  const [supporters, setSupporters] = useState('');
  const [body, setBody] = useState('');
  const [requirements, setRequirements] = useState('');
  const [observation, setObservations] = useState('');
  const [course, setCourse] = useState('');

  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    ml: 3,
    alignItems: 'center',
  };

  function handleChange(index) {
    checkedBoxes[index] = !checkedBoxes[index];
    setCheckedBoxes(checkedBoxes);
  }

  function handleClick() {
    const t = tags.filter((element, index) => checkedBoxes[index]);
    const z = requirements.split(/[,|]+/).map((str) => str.trim());
    const newPost = {
      subject,
      ownerId: '',
      devId: '',
      body,
      supporters: supporters.split(/[,|]+/).map((str) => str.trim()),
      isArchived: false,
      tags: [...t, ...z],
      course,
    };
    console.log(newPost);
    // todo connect to backend using axios
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Novo projeto</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nome do projeto</label>
                        <Input
                          placeholder="Nome do projeto"
                          type="text"
                          value={subject}
                          onChange={(event) => setSubject(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Sigla da disciplina</label>
                        <Input
                          placeholder="MC000"
                          type="text"
                          value={course}
                          onChange={(event) => setCourse(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Descrição do projeto</label>
                        <Input
                          type="textarea"
                          placeholder="Escreva uma descrição do projeto"
                          value={body}
                          onChange={(event) => setBody(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <label>Linguagens e tecnologias</label>
                  <Row>
                    <Col md="4">
                      <Box sx={boxStyle}>
                        {tags.slice(0, tags.length / 3).map((tag, index) => (
                          <FormControlLabel
                            control={(
                              <Checkbox
                                onChange={() => handleChange(index)}
                                sx={{
                                  '&.Mui-checked': {
                                    color: '#EE4A68',
                                  },
                                }}
                              />
                            )}
                            label={tag}
                          />
                        ))}
                      </Box>
                    </Col>
                    <Col md="4">
                      <Box sx={boxStyle}>
                        {tags.slice(tags.length / 3, 2 * (tags.length / 3)).map((tag, index) => (
                          <FormControlLabel
                            control={(
                              <Checkbox
                                onChange={() => handleChange(index)}
                                sx={{
                                  '&.Mui-checked': {
                                    color: '#EE4A68',
                                  },
                                }}
                              />
                            )}
                            label={tag}
                          />
                        ))}
                      </Box>
                    </Col>
                    <Col md="4">
                      <Box sx={boxStyle}>
                        {tags.slice(2 * (tags.length / 3), tags.length).map((tag, index) => (
                          <FormControlLabel
                            control={(
                              <Checkbox
                                onChange={() => handleChange(index)}
                                sx={{
                                  '&.Mui-checked': {
                                    color: '#EE4A68',
                                  },
                                }}
                              />
                            )}
                            label={tag}
                          />
                        ))}
                      </Box>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Outros requerimentos</label>
                        <Input
                          type="textarea"
                          placeholder="Kotlin, PHP, Unity"
                          value={requirements}
                          onChange={(event) => setRequirements(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Participantes</label>
                        <Input
                          type="textarea"
                          placeholder="username, username"
                          value={supporters}
                          onChange={(event) => setSupporters(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Imagem ou Vídeo</label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                          Selecione uma imagem ou vídeo que represente o projeto.
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Observações</label>
                        <Input
                          type="textarea"
                          placeholder="Observações sobre o projeto"
                          value={observation}
                          onChange={(event) => setObservations(event.target.value)}
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
                            onClick={handleClick}
                          >
                            Enviar projeto
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

export default AddProject;
