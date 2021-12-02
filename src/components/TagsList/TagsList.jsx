/* eslint-disable react/forbid-prop-types, object-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import CloseIcon from '@material-ui/icons/Close';

function TagsList(props) {
  const { id, form, setForm } = props;
  const [tags, setTags] = useState([]);

  const addTags = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTags([...tags, event.target.value]);
      setForm({
        ...form,
        [id]: tags,
      });
      // event.target.value = '';
    }
  };
  const removeTags = (tag) => {
    setTags([...tags.filter((t) => t !== tag)]);
    setForm({
      ...form,
      [id]: tags,
    });
  };

  return (
    <div className="tags-input">
      <ul>
        {tags.map((tag) => (
          <li>
            <span>{tag}</span>
            <Button onClick={() => removeTags(tag)}>
              <CloseIcon />
            </Button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) => addTags(event)}
        placeholder="Pressione a tecla Enter para adicionar tag"
      />
    </div>
  );
}

TagsList.propTypes = {
  id: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default TagsList;
