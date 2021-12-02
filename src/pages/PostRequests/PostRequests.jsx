/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import '../../assets/scss/historic.scss';
import NavBar from '../../components/Navbars/Navbar';
import RequestCard from '../../components/RequestCard/RequestCard';
import apiHandler from '../../services/api';
import { logout } from '../../services/auth';

function PostRequestsPage() {
  const [posts, setPosts] = useState([]);
  function postSort(a, b) {
    if (a.subject > b.subject) {
      return 1;
    }
    if (a.subject < b.subject) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const fetchData = () => {
      apiHandler
        .get('/request/received')
        .then((response) => {
          setPosts(response.data);
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
  if (posts.length === 0) {
    return (
      <>
        <NavBar />
        <div className="content">
          <Row>
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h4">Lista de solicitações vazia</CardTitle>
              </CardHeader>
              <CardBody>
                <Row md="auto">
                  <Col md="4" />
                  <Col md="4">
                    <h5>
                      No momento não há solicitações de participação em seus
                      projetos. Novas solicitações de participação serão
                      mostradas quando um usuário for recomendado ou demonstrar
                      interesse em um projeto
                    </h5>
                  </Col>
                  <Col md="4" />
                </Row>
              </CardBody>
            </Card>
          </Row>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <div className="content">
        {posts.map((post) => (
          <Row>
            <RequestCard
              title={post.subject}
              devs={post.requests.map((req) => ({
                devId: req.devId,
                description: req.description,
                requestId: req['_id'],
              }))}
              descriptions
              callback={(requestId) => {
                const newArray = posts.filter((p) => p['_id'] !== post['_id']);
                const updatedPost = {
                  ...post,
                  requests: post.requests.filter(
                    (req) => req['_id'] !== requestId,
                  ),
                };
                const ret = [...newArray, updatedPost].filter(
                  (p) => p.requests.length > 0,
                );
                setPosts(ret.sort(postSort));
              }}
            />
          </Row>
        ))}
      </div>
    </>
  );
}

export default PostRequestsPage;
