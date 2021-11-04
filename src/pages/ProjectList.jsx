import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/img1.jpg';
import NavBar from '../components/Navbars/Navbar';
import apiHandler from '../services/api';
import { logout } from '../services/auth';

function ProjectList() {
  // eslint-disable-next-line no-unused-vars
  const [projectList, setProjectList] = useState([]);
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
          <Col md="4">
            <Card className="card-project">
              <CardBody>
                <div className="card-title-group">
                  <h4 className="card-title">Projeto 1</h4>
                  <div className="card-date">Prazo de entrega: 20/10/2021</div>
                </div>
                <img className="image" src={img1} alt="Foto do projeto" />
                <CardHeader>
                  <CardTitle tag="h5">Descrição</CardTitle>
                </CardHeader>
                <p className="description">
                  Descrição do projeto, lorem ipsum dolor sit amet, consectetur
                  adipiscing elit.
                </p>
                <CardHeader>
                  <CardTitle tag="h5">Linguagens e tecnologias</CardTitle>
                </CardHeader>
                <p className="description">Python, Figma</p>
                <CardHeader>
                  <CardTitle tag="h5">Outros requerimentos</CardTitle>
                </CardHeader>
                <p className="description">
                  Requerimentos do projeto, ut quis lectus at ante ultricies
                  laoreet.
                </p>
                <CardHeader>
                  <CardTitle tag="h5">Observações</CardTitle>
                </CardHeader>
                <p className="description">
                  Observações sobre o projeto, nullam aliquam, diam eget egestas
                  tristique.
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
        </Row>
      </div>
    </>
  );
}

export default ProjectList;
