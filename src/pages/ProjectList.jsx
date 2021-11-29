/* eslint-disable no-alert, operator-linebreak */
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

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ReportIcon from '@material-ui/icons/Report';
import img1 from '../assets/images/img1.jpg';
import NavBar from '../components/Navbars/Navbar';
import apiHandler from '../services/api';
import { checkMod, login, logout, modAccess } from '../services/auth';

function ProjectList() {
  const [projectList, setProjectList] = useState(null);
  const [dialog, setDialog] = useState(false);
  // eslint-disable-next-line object-curly-newline
  const [report, setReport] = useState({});

  const handleSelect = (post) => {
    setReport(post);
    setDialog(true);
  };

  const handleClose = () => {
    // eslint-disable-next-line object-curly-newline
    setReport({});
    setDialog(false);
  };

  const handleReport = () => {
    apiHandler
      .post('/report/post', report)
      .then(() => {
        alert('Denúncia foi registrada');
      })
      .catch(() => {
        // console.log(error);
        alert('Algo deu errado');
      });
    handleClose();
  };

  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get('/posts')
        .then((response) => {
          setProjectList(response.data);
          login();
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 401) {
            logout();
          }
        });
      apiHandler
        .get('/access')
        .then(() => {
          if (!checkMod()) {
            modAccess();
            window.location.reload();
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // console.log(error);
        });
    };

    fetchData();
  }, []);

  function handleInterestRequest(postId) {
    apiHandler
      .get('/my_profile')
      .then((response) => {
        const devId = response.data.username;
        const post = postId;
        apiHandler.post('/request/create', {
          post,
          devId,
          description: '',
        });
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 401) {
          logout();
        }
      });
  }

  return (
    <>
      <NavBar />
      <div className="content">
        <Row>
          {projectList &&
            projectList.map((post) => (
              <Col md="3">
                <Card className="card-project">
                  <CardBody>
                    <div className="card-title-group">
                      <Grid container alignItems="center">
                        <Grid item xs={10}>
                          <h4 className="card-title">
                            <Link
                              // eslint-disable-next-line dot-notation
                              to={`/post/${post['_id']}`}
                            >
                              {post.subject}
                            </Link>
                          </h4>
                          <div className="card-date">
                            Prazo de entrega: 20/10/2021
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            className="button-report"
                            onClick={() => handleSelect(post)}
                          >
                            <ReportIcon />
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                    <img className="image" src={img1} alt="Foto do projeto" />
                    <CardHeader>
                      <CardTitle tag="h5">Descrição</CardTitle>
                    </CardHeader>
                    <p className="description">{`${post.body.substring(0, 75)}...`}</p>
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
                          <Button
                            // eslint-disable-next-line dot-notation
                            onCLick={() => handleInterestRequest(post['_id'])}
                            className="button-apply"
                          >
                            Tenho interesse
                          </Button>
                          <Link to={`/project/recommend/${post.subject}`}>
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
      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle id="report-confirmation-title">
          Confirmação de Denúncia
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="report-confirmation-description">
            {`Você realmente deseja denunciar o projeto ${report.subject}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="danger" onClick={handleReport}>
            Denunciar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProjectList;
