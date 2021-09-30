import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({
  title, date, image, overview, overviewdescription, requirements, requirementsdescription,
  othersrequirements, othersrequirementsdescription, comments, commentsdescription,
}) {
  return (
    <div className="card">
      <div className="card-title-group">
        <h5 className="card-title">{title}</h5>
        <div className="card-date">{date}</div>
      </div>
      <img className="card-image" src={image} alt="Imagem" />
      <div className="card-header">
        <div className="profile">
          <span className="letter">{overview}</span>
        </div>
      </div>
      <div className="card-text">{overviewdescription}</div>
      <p>
        <div className="card-header">
          <div className="profile">
            <span className="letter">{requirements}</span>
          </div>
        </div>
        <div className="card-text">{requirementsdescription}</div>
      </p>
      <p>
        <div className="card-header">
          <div className="profile">
            <span className="letter">{othersrequirements}</span>
          </div>
        </div>
        <div className="card-text">{othersrequirementsdescription}</div>
      </p>
      <p>
        <div className="card-header">
          <div className="profile">
            <span className="letter">{comments}</span>
          </div>
        </div>
        <div className="card-text">{commentsdescription}</div>
      </p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.element.isRequired,
  overview: PropTypes.string.isRequired,
  overviewdescription: PropTypes.string.isRequired,
  requirements: PropTypes.string.isRequired,
  requirementsdescription: PropTypes.string.isRequired,
  othersrequirements: PropTypes.string.isRequired,
  othersrequirementsdescription: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  commentsdescription: PropTypes.string.isRequired,
};
