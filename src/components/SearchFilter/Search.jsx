import React, { Component } from 'react';
import Filters from './Filters';
import InputFilter from './InputFilter';
// import Projects from './projects';

class Search extends Component {
  state = {
    filters: { title: '' },
  }

  onFilterChange = ({ filters }) => {
    this.setState({ filters });
  }

  render() {
    const { filters } = this.state;
    const projects = Projects.filter(({ title }) => (
      title.includes(filters.title)
    ))
    return (
      <div>
        <Filters onChange={this.onFilterChange}>
          <InputFilter filterName="title" />
        </Filters>
        <ul>
          {projects.map(({ title }) => <li key={title}>{title}</li>)}
        </ul>
      </div>
    );
  }
}

export default Search;