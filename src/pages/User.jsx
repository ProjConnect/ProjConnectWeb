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
import '../assets/scss/historic.scss';
import 'react-vertical-timeline-component/style.min.css';
import avatar from '../assets/images/avatar.png';
import NavBar from '../components/Navbars/Navbar';
import apiHandler from '../services/api';
import { logout } from '../services/auth';
import TimeLine from '../components/TimeLine/TimeLine';

function User() {
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
                <CardTitle tag="h5" />
              </CardHeader>
              <CardBody>
                <div className="author">
                  <img
                    className="avatar"
                    src={avatar}
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
        <TimeLine />
      </div>
    </>
  );
}

export default User;
