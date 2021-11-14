import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/img1.jpg';
import NavBar from '../components/Navbars/Navbar';
import apiHandler from '../services/api';
import { logout } from '../services/auth';

function ProjectList() {
  // eslint-disable-next-line no-unused-vars
  const [projectList, setProjectList] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get('/posts')
        .then((response) => {
          setProjectList(response.data);
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
          {projectList
            && projectList.map((post) => (
              <Col md="4">
                <Card className="card-project">
                  <CardBody>
                    <div className="card-title-group">
                      <h4 className="card-title">{post.subject}</h4>
                      <div className="card-date">
                        Prazo de entrega: 20/10/2021
                      </div>
                    </div>
                    <img className="image" src={img1} alt="Foto do projeto" />
                    <CardHeader>
                      <CardTitle tag="h5">Descrição</CardTitle>
                    </CardHeader>
                    <p className="description">{post.body}</p>
                    <CardHeader>
                      <CardTitle tag="h5">Linguagens e tecnologias</CardTitle>
                    </CardHeader>
                    <p className="description">{post.tags.join(', ')}</p>
                    <CardHeader>
                      <CardTitle tag="h5">Outros requerimentos</CardTitle>
                    </CardHeader>
                    <p className="description">
                      {post.course !== ''
                        ? `Requer estar cursando disciplina ${post.course}`
                        : 'Não há outros requisitos!'}
                    </p>
                    <CardHeader>
                      <CardTitle tag="h5">Observações</CardTitle>
                    </CardHeader>
                    <p className="description">
                      {post.course !== ''
                        ? `Projeto vinculado a disciplina ${post.course}`
                        : ''}
                    </p>
                    <Row>
                      <Col className="ml-auto">
                        <div className="update ml-auto mr-auto">
                          <Button className="button-apply">
                            Tenho interesse
                          </Button>
                          <Link to="/project/recommend">
                            <Button className="button-recommend">
                              Recomendar Dev
                            </Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
}

export default ProjectList;
