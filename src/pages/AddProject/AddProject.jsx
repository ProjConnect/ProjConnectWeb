/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable  operator-linebreak */
/* eslint-disable object-curly-newline, no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../LandingPage/LandingPage.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
} from 'reactstrap';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import NavBar from '../../components/Navbars/Navbar';
import ImageSelect from '../../components/ImageSelect/ImageSelect';
import ProjectImages from '../../components/ProjectImages/ProjectImages';
import apiHandler from '../../services/api';
import { logout } from '../../services/auth';

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
  const imageSet = ProjectImages;
  const [checkedBoxes, setCheckedBoxes] = useState(
    new Array(tags.length).fill(false),
  );
  const [subject, setSubject] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [supporters, setSupporters] = useState('');
  const [body, setBody] = useState('');
  const [requirements, setRequirements] = useState('');
  const [observation, setObservations] = useState('');
  const [course, setCourse] = useState('');
  const [missingFields, setMissingFields] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [image, setImage] = useState({ index: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    apiHandler
      .get('/my_profile')
      .then((response) => {
        setOwnerId(response.data.username);
      })
      .catch((er) => {
        if (er.response.status === 401) {
          logout();
        }
      });
  }, []);

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
    const r = requirements.split(/[,|]+/).map((str) => str.trim());
    let requiredFieldsFilled = subject.length * body.length > 0;
    requiredFieldsFilled = requiredFieldsFilled && r.length > 0;
    setMissingFields(!requiredFieldsFilled);
    if (requiredFieldsFilled) {
      const newPost = {
        subject,
        ownerId,
        deadline,
        devId: [ownerId, ...supporters.split(/[,|]+/).map((str) => str.trim())],
        body,
        supporters: supporters.split(/[,|]+/).map((str) => str.trim()),
        isArchived: false,
        tags: r,
        course,
        image: image.index,
      };
      apiHandler
        .post('/new-post', newPost)
        .then(() => {
          setError(false);
          window.location.replace('/project/list');
        })
        .catch((er) => {
          setError(true);
          if (er.response) {
            switch (er.response.status) {
              case 201:
                window.location.replace('/project/list');
                break;
              case 401:
                logout();
                break;
              default:
                break;
            }
          }
        });
    }
  }

  return (
    <>
      <NavBar />
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
                        <label>Nome do projeto*</label>
                        <Input
                          placeholder="Nome do projeto"
                          type="text"
                          value={subject}
                          onChange={(event) => setSubject(event.target.value)}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
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
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Prazo</label>
                        <Input
                          type="date"
                          value={deadline}
                          onChange={(event) => setDeadline(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Descrição do projeto*</label>
                        <Input
                          type="textarea"
                          placeholder="Escreva uma descrição do projeto"
                          value={body}
                          onChange={(event) => setBody(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <label>Linguagens e tecnologias</label>
                   <Row>
                    <Col md="4">
                      <Box sx={boxStyle}>
                        {tags.slice(0, tags.length / 3).map((tag, index) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() => handleChange(index)}
                                sx={{
                                  '&.Mui-checked': {
                                    color: '#EE4A68',
                                  },
                                }}
                              />
                            }
                            label={tag}
                          />
                        ))}
                      </Box>
                    </Col>
                    <Col md="4">
                      <Box sx={boxStyle}>
                        {tags
                          .slice(tags.length / 3, 2 * (tags.length / 3))
                          .map((tag, index) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={() => handleChange(index)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: '#EE4A68',
                                    },
                                  }}
                                />
                              }
                              label={tag}
                            />
                          ))}
                      </Box>
                    </Col>
                    <Col md="4">
                      <Box sx={boxStyle}>
                        {tags
                          .slice(2 * (tags.length / 3), tags.length)
                          .map((tag, index) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={() => handleChange(index)}
                                  sx={{
                                    '&.Mui-checked': {
                                      color: '#EE4A68',
                                    },
                                  }}
                                />
                              }
                              label={tag}
                            />
                          ))}
                      </Box>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Linguagens e Tecnologias</label>
                        <Input
                          type="textarea"
                          placeholder="Kotlin, PHP, Unity"
                          value={requirements}
                          onChange={(event) => {
                            setRequirements(event.target.value);
                          }}
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
                          onChange={(event) => {
                            setSupporters(event.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Button
                        className="button-round"
                        onClick={() => setDialog(true)}
                      >
                        Escolher imagem de projeto
                      </Button>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Observações</label>
                        <Input
                          type="textarea"
                          placeholder="Observações sobre o projeto"
                          value={observation}
                          onChange={(event) => {
                            setObservations(event.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}
                  <div className="button-container">
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="button-round"
                          onClick={() => handleClick()}
                        >
                          Enviar projeto
                        </Button>
                        {error && (
                          <p>
                            Ocorreu um erro ao processar a requisição. Verifique
                            os campos.
                          </p>
                        )}
                        {missingFields && (
                          <p>Há campos obrigtórios faltantes</p>
                        )}
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
        form={image}
        setForm={setImage}
        value="index"
        imageSet={imageSet}
        description="Selecione a imagem desejada"
      />
    </>
  );
}

export default AddProject;
