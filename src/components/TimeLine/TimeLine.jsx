/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, CardTitle, Row } from 'reactstrap';
import useCollapse from 'react-collapsed';
import '../../assets/scss/historic.scss';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';
import img5 from '../../assets/img5.jpg';

function TimeLine({ posts }) {
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
  });
  const IconStyles = {
    background: '#06D6A0',
  };

  const images = [img1, img2, img3, img4, img5];

  const [counter, incrementCounter] = useState(0);

  return (
    <VerticalTimeline>
      {posts
        && posts.map((element) => {
          const img = images[counter % 5];
          incrementCounter(counter + 1);

          return (
            // eslint-disable-next-line dot-notation
            <VerticalTimelineElement key={element['_id']} iconStyle={IconStyles}>
              <Row className="vertical-timeline-element-title">
                <div className="project-title">
                  {` ${element.subject} `}
                  <Button
                    className="historic-button"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getToggleProps({
                      onClick: () => {
                        setExpanded((prevExpanded) => !prevExpanded);
                      },
                    })}
                  >
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                  </Button>
                </div>
              </Row>
              <p>
                <img className="img" src={img} alt="Imagem" />
              </p>
              <CardTitle tag="h5">Descrição</CardTitle>
              <p className="description">{`${element.body}`}</p>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <section {...getCollapseProps()}>
                <CardTitle tag="h5">Linguagens e tecnologias</CardTitle>
                <p className="description">{`${element.tags.join(', ')}`}</p>
                <CardTitle tag="h5">Outros requerimentos</CardTitle>
                <p className="description">
                  {element.course !== ''
                    ? `Requer estar cursando disciplina ${element.course}`
                    : 'Não há outros requisitos!'}
                </p>
                <CardTitle tag="h5">Observações</CardTitle>
                <p className="description">
                  {element.course !== ''
                    ? `Projeto vinculado a disciplina ${element.course}`
                    : ''}
                </p>
              </section>
            </VerticalTimelineElement>
          );
        })}
    </VerticalTimeline>
  );
}

export default TimeLine;
