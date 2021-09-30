import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
} from 'reactstrap';
import img1 from '../assets/images/img1.jpg';

function ProjectList() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-project">
              <CardBody>
                <div className="card-title-group">
                  <h4 className="card-title">Projeto 1</h4>
                  <div className="card-date">Prazo de entrega: 20/10/2021</div>
                </div>
                <img
                  className="image"
                  src={img1}
                  alt="Foto do projeto"
                />
                <CardHeader>
                  <CardTitle tag="h5">Descrição</CardTitle>
                </CardHeader>
                <p className="description">
                  Descrição do projeto, lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <CardHeader>
                  <CardTitle tag="h5">Linguagens e tecnologias</CardTitle>
                </CardHeader>
                <p className="description">
                  Python, Figma
                </p>
                <CardHeader>
                  <CardTitle tag="h5">Outros requerimentos</CardTitle>
                </CardHeader>
                <p className="description">
                  Requerimentos do projeto, ut quis lectus at ante ultricies laoreet.
                </p>
                <CardHeader>
                  <CardTitle tag="h5">Observações</CardTitle>
                </CardHeader>
                <p className="description">
                  Observações sobre o projeto, nullam aliquam, diam eget egestas tristique.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProjectList;
