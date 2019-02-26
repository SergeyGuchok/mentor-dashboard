import React, { Component } from 'react';
import * as json from './data.json';
import { MentorSelect } from './services/mentor-select';
import { MentorTable } from './services/mentor-table';
import Legend from './presentational/legend';
import './app.css';
import './reset.css';


class App extends Component {
  state = {
    selectedOption: JSON.parse(localStorage.getItem('mentor')) || null,
  }

  handleChange = (selectedOption) => {
    localStorage.setItem('mentor', JSON.stringify(selectedOption));
    this.setState({ selectedOption });
  }
  render() {
    console.log(this.state);
    return (
      <main className="main">
        <MentorSelect onChange={this.handleChange} options={json.mentors} value={this.state.selectedOption} />
        <MentorTable data={json} mentor={this.state.selectedOption}/>
        <Legend />
      </main>
    )
  }
}

export default App;
