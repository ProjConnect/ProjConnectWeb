/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
// import '../../assets/scss/historic.scss';
import { Link } from 'react-router-dom';
import apiHandler from '../../services/api';

function RequestCard({ title, devs, callback }) {
  function accept(req) {
    const res = {
      requestId: req,
      accepted: true,
    };
    apiHandler.post('/request/response', res);
    callback(req);
  }

  function refuse(req) {
    const res = {
      requestId: req,
      accepted: false,
    };
    apiHandler.post('/request/response', res);
    callback(req);
  }

  return (
    <>
      <Card className="card-user">
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          {devs.map((dev) => (
            <Col className="ml-auto">
              <p className="topic">Username</p>
              <Link to={`/profile/user/${dev.devId}`}>
                <p>{dev.devId}</p>
              </Link>
              {dev.description.length > 0 && (
                <>
                  <p className="topic">Descrição</p>
                  <p>{dev.description}</p>
                </>
              )}
              <Row>
                <Col md="4" />
                <Col md="4">
                  <Button
                    className="button-apply"
                    onClick={() => accept(dev.requestId)}
                  >
                    Aceitar solicitação
                  </Button>
                  <Button
                    className="button-recommend"
                    onClick={() => refuse(dev.requestId)}
                  >
                    Recusar solicitação
                  </Button>
                </Col>
                <Col md="4" />
              </Row>
              <hr />
            </Col>
          ))}
        </CardBody>
      </Card>
    </>
  );
}

export default RequestCard;
