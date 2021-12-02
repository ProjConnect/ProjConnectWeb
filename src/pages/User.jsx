import React, { useEffect, useState } from 'react';
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
import useCollapse from 'react-collapsed';
import '../assets/scss/historic.scss';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import ProjectImages from '../components/ProjectImages/ProjectImages';
import 'react-vertical-timeline-component/style.min.css';
import Avatars from '../components/Avatars/Avatars';
import NavBar from '../components/Navbars/Navbar';
import apiHandler from '../services/api';
import { logout } from '../services/auth';

function User() {
  const avatars = Avatars;
  const projectImgs = ProjectImages;

  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
  });
  const IconStyles = {
    background: '#06D6A0',
  };
  const [form, setForm] = useState({
    username: '',
    avatar: null,
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

  const [projects, setProjects] = useState([]);

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
      apiHandler
        .get('/posts/mine')
        .then((response) => {
          setProjects(response.data);
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
                <CardTitle tag="h5" />
              </CardHeader>
              <CardBody>
                <div className="author">
                  <img
                    className="avatar"
                    src={form.avatar !== null ? avatars[form.avatar] : null}
                    alt="Avatar do usuário"
                  />
                  <h5 className="title">{`${form.firstName} ${form.lastName}`}</h5>
                  <p className="description">{`@${form.username}`}</p>
                </div>
                <p className="topic">Sobre mim</p>
                <p className="description">{form.aboutMe}</p>
                <p className="topic">Github</p>
                <p className="description">
                  <a href={form.github} onClick={(e) => e.preventDefault()}>
                    {form.github}
                  </a>
                </p>
                <p className="topic">Gitlab</p>
                <p className="description">
                  <a href={form.gitlab} onClick={(e) => e.preventDefault()}>
                    {form.gitlab}
                  </a>
                </p>
                <p className="topic">Conhecimento em linguagens</p>
                <p className="description">{form.languages}</p>
                <p className="topic">Conhecimento em tecnologias</p>
                <p className="description">{form.technologies}</p>
                <p className="topic">Conhecimentos gerais</p>
                <p className="description">{form.otherSkills}</p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto">
                      <div className="update ml-auto mr-auto">
                        <Link to="/profile/edit">
                          <Button className="button-round">
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
        </Row>
        <h4 className="historic-title">
          Histórico de pedidos realizados e propostos
        </h4>
        <VerticalTimeline>
          {projects.map((element) => (
            <VerticalTimelineElement key={element.key} iconStyle={IconStyles}>
              <Row className="vertical-timeline-element-title">
                <div className="project-title">
                  {` ${element.subject} `}
                  <Button
                    className="historic-button"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getToggleProps({
                      onClick: () => {
                        setExpanded((prevExpanded) => !prevExpanded);
                      },
                    })}
                  >
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                  </Button>
                </div>
              </Row>
              <p>
                <img
                  className="img"
                  src={projectImgs[element.image]}
                  alt="Imagem"
                />
              </p>
              <CardTitle tag="h5">Descrição</CardTitle>
              <p className="description">{element.body}</p>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <section {...getCollapseProps()}>
                <CardTitle tag="h5">Linguagens e tecnologias</CardTitle>
                <p className="description">{element.tags.join(', ')}</p>
                <CardTitle tag="h5">Outros requerimentos</CardTitle>
                <p className="description">
                  {element.course !== ''
                    ? `Requer estar cursando disciplina ${element.course}`
                    : 'Não há outros requisitos!'}
                </p>
                <CardTitle tag="h5">Observações</CardTitle>
                <p className="description">
                  Observações sobre o projeto, nullam aliquam, diam eget egestas
                  tristique.
                </p>
              </section>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default User;
