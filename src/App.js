import React, { Component } from 'react';
import * as json from './text.json';
import { MentorSelect } from './services/mentor-select';
import { MentorTable } from './services/mentor-table';


class App extends Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    return (
      <div>
        <MentorSelect onChange={this.handleChange} options={json} value={this.state.selectedOption} />
      </div>
    )
  }
}



export default App;
