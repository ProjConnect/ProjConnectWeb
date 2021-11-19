/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Card, Form, FormGroup, Input, Row, Col, Button } from 'reactstrap';
import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import apiHandler from '../../services/api';
import { checkMod } from '../../services/auth';
import NavBar from '../../components/Navbars/Navbar';

function ModeratorPage() {
  const [reported, setReported] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [form, setForm] = useState({
    email: '',
  });

  const handleUnreport = (post) => {
    apiHandler
      .post('/unreport/post', post)
      .then(() => {
        // eslint-disable-next-line no-underscore-dangle
        setReported(reported.filter((item) => item._id !== post._id));
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        alert('Algo deu errado!');
      });
  };

  const handleRemove = (post) => {
    apiHandler
      .post('/delete/post', post)
      .then(() => {
        // eslint-disable-next-line no-underscore-dangle
        setReported(reported.filter((item) => item._id !== post._id));
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // console.log(error);
        alert('Algo deu errado!');
      });
  };

  const handleClose = () => {
    setForm({
      email: '',
    });
    setDialog(false);
  };

  const handleAddMod = () => {
    apiHandler
      .post('/promote/user', form)
      .then(() => {
        alert('O usuário foi promovido a moderador!');
        handleClose();
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 404) {
          alert('Usuário não encontrado!');
        }
      });
  };

  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get('/search/post/reported')
        .then((response) => {
          if (response.status === 200) {
            setReported(response.data);
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // console.log(error);
        });
    };
    if (checkMod()) {
      fetchData();
    }
  }, []);

  if (!checkMod()) {
    return <Redirect to="/project/list" />;
  }
  return (
    <>
      <NavBar />
      <div className="content">
        <Row>
          <Col md="12">
            <Grid container>
              <Grid item marginTop="10vh" md="12" textAlign="center">
                <Button
                  className="button-add-mod"
                  onClick={() => setDialog(true)}
                >
                  Adicionar Moderador
                </Button>
              </Grid>
              <Grid item md="12">
                <Card className="card-mod">
                  <Box maxHeight="80vh" overflow="auto">
                    <List>
                      {reported === [] ? (
                        <Typography variant="h3" textAlign="center">
                          Não há denúncias de projetos para serem analisadas
                        </Typography>
                      ) : (
                        reported.map((post) => (
                          <div>
                            <ListItem>
                              <Grid container alignItems="center">
                                <Grid item xs={10}>
                                  <Typography variant="h4">
                                    {post.subject}
                                  </Typography>
                                  <Typography variant="h6">
                                    {`Descrição: ${post.body}`}
                                  </Typography>
                                  <Typography variant="h6">
                                    {`Usuário: ${post.ownerId}`}
                                  </Typography>
                                  <Typography variant="h6">
                                    {`Tags: ${post.tags.join(', ')}`}
                                  </Typography>
                                  <Typography variant="h6">
                                    {`Curso: ${post.course}`}
                                  </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                  <Button
                                    className="button-mod-ok"
                                    onClick={() => handleUnreport(post)}
                                  >
                                    OK
                                  </Button>
                                </Grid>
                                <Grid item xs={1}>
                                  <Button
                                    className="button-mod-delete"
                                    onClick={() => handleRemove(post)}
                                  >
                                    Apagar
                                  </Button>
                                </Grid>
                              </Grid>
                            </ListItem>
                            <Divider />
                          </div>
                        ))
                      )}
                    </List>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Col>
        </Row>
      </div>
      <Dialog fullWidth open={dialog} onClose={handleClose}>
        <DialogTitle id="report-confirmation-title">
          Insira o e-mail do usuário para torná-lo moderador
        </DialogTitle>
        <DialogContent>
          <Form>
            <FormGroup>
              <Input
                id="email"
                value={form.email}
                onChange={(e) => {
                  setForm({
                    email: e.target.value,
                  });
                }}
                type="text"
                required
              />
            </FormGroup>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className="add-color" onClick={handleAddMod}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModeratorPage;
