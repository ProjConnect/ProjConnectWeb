/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import '../../assets/scss/historic.scss';
import 'react-vertical-timeline-component/style.min.css';
import Avatars from '../../components/Avatars/Avatars';
import NavBar from '../../components/Navbars/Navbar';
import TimeLine from '../../components/TimeLine/TimeLine';
import apiHandler from '../../services/api';
import { logout } from '../../services/auth';

function ProfilePage({ match }) {
  const avatars = Avatars;
  const { username } = match.params;
  const [projects, setProjects] = useState([]);
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

  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get(`/search/user/username/${username}`)
        .then((response) => {
          setForm(response.data);
          apiHandler.get(`/search/post/user/${username}`)
            .then((res) => {
              setProjects(res.data);
            })
            .catch((error) => {
              // console.log(error);
              if (error.response && error.response.status === 401) {
                logout();
              }
            });
        })
        .catch((error) => {
          // console.log(error);
          if (error.response && error.response.status === 401) {
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
                <p className="topic">Sobre</p>
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
            </Card>
          </Col>
        </Row>
        <h4 className="historic-title">
          Histórico de pedidos realizados e propostos
        </h4>
        <TimeLine posts={projects} />
      </div>
    </>
  );
}

export default ProfilePage;
