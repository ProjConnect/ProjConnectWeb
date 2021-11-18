/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import recommendimage from '../../assets/images/recommend.png';
import NavBar from '../../components/Navbars/Navbar';
import apiHandler from '../../services/api';
import { logout } from '../../services/auth';

function RecommendPage({ match }) {
  const [form, setForm] = useState({
    name: match.params.name,
    username: '',
    aboutDev: '',
  });

  // Handlers
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (form.username.length === 0) {
      return;
    }
    const post = await apiHandler.get(`search/post/name/${form.name}`);
    apiHandler.post('request/create', {
      post: post.postId,
      devId: form.username,
      description: form.aboutDev,
    });
  };

  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get('/my_profile')
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
              <Col md="6">
                <img
                  className="image"
                  src={recommendimage}
                  alt="Recomendação de dev"
                />
              </Col>
              <CardTitle tag="h3">Recomendar Dev</CardTitle>
              <br />
              <CardTitle tag="h5">
                Conhece algum(a) Dev que se encaixa nesse projeto? Faça sua
                recomendação! ♥
              </CardTitle>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Nome do projeto</label>
                        <Input
                          id="projectName"
                          value={form.name}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Usuário do(a) Dev</label>
                        <Input
                          id="username"
                          value={form.username}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Por que você recomenda o(a) Dev?</label>
                        <Input
                          id="aboutDev"
                          value={form.aboutMe}
                          onChange={(e) => handleChange(e)}
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                    <div className="button-container">
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Link to="/project/list">
                            <Button
                              onClick={() => handleSubmit()}
                              className="button-round"
                            >
                              Enviar recomendação
                            </Button>
                          </Link>
                          <Link to="/project/list">
                            <Button className="button-cancel">Cancelar</Button>
                          </Link>
                        </div>
                      </Row>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RecommendPage;
