/* eslint-disable no-alert, operator-linebreak, import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import ReportIcon from '@material-ui/icons/Report';
import img1 from '../../assets/images/img1.jpg';
import NavBar from '../../components/Navbars/Navbar';
import apiHandler from '../../services/api';
import { checkMod, login, logout, modAccess } from '../../services/auth';

function PostPage() {
  const { postId } = useParams();
  const [ideaPost, setPost] = useState(null);
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
        .get(`/search/post/id/${postId}`)
        .then((response) => {
          setPost(response.data);
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

  function handleInterestRequest(postIdd) {
    apiHandler
      .get('/my_profile')
      .then((response) => {
        const devId = response.data.username;
        const post = postIdd;
        const newRequest = {
          post,
          devId,
          description: '',
        };
        apiHandler.post('/request/create', newRequest).then(() => {
          alert('Solicitação feita com sucesso');
        }).catch(() => {
          alert('Erro na solicitação');
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
          {ideaPost && (
            <Col md="12">
              <Card className="card-user">
                <CardBody>
                  <div className="card-title-group">
                    <Grid container alignItems="center">
                      <Grid item xs={10}>
                        <h1 className="card-title">{ideaPost.subject}</h1>
                        <div className="card-date">
                          Prazo de entrega: 20/10/2021
                        </div>
                        <div>
                          <p>
                            Ideia postada por &nbsp;
                            <Link to={`/profile/${ideaPost.ownerId}`}>
                              <b>{ideaPost.ownerId}</b>
                            </Link>
                          </p>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div className="text-right">
                          <Button
                            className="button-report"
                            onClick={() => handleSelect(ideaPost)}
                          >
                            <b>Denunciar! </b>
                            <ReportIcon />
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <Row>
                    <Col md="12">
                      <img className="image" src={img1} alt="Foto do projeto" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <h4 className="card-title">Integrantes</h4>
                      {ideaPost.devId.length > 0 &&
                        ideaPost.devId.map((dev) => (
                          <Link to={`/profile/${dev}`}>
                            {dev}
                            ,
                          </Link>
                        ))}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <h4 className="card-title">Descrição sobre o Projeto</h4>
                      <p className="description">{ideaPost.body}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <h4 className="card-title">Linguagens e Tecnologias</h4>
                      <p className="description">{ideaPost.tags.join(', ')}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <h4 className="card-title">
                        Outros Requisitos para Participar
                      </h4>
                      <p className="description">
                        {ideaPost.course !== ''
                          ? `Requer estar cursando disciplina ${ideaPost.course}`
                          : 'Não há outros requisitos!'}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <h4 className="card-title">Observações</h4>
                      <p className="description">
                        {ideaPost.course !== ''
                          ? `Projeto vinculado a disciplina ${ideaPost.course}`
                          : ''}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ml-auto">
                      <div className="update ml-auto mr-auto text-center">
                        <Button
                          // eslint-disable-next-line dot-notation
                          onCLick={() => handleInterestRequest(ideaPost['_id'])}
                          className="button-apply"
                        >
                          Tenho interesse
                        </Button>
                        <Link to={`/project/recommend/${ideaPost.subject}`}>
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
          )}
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

export default PostPage;
