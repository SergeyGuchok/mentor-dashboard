import React, { Component } from 'react';
import * as json from './data.json';
import { MentorSelect } from './services/mentor-select';
import { MentorTable } from './services/mentor-table';
import Legend from './presentational/legend';
import './app.css';
import './reset.css';


class App extends Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  render() {
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
