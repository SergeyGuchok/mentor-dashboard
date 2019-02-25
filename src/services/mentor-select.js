import React, { Component } from 'react';
import { MentorSelectPresentational } from '../presentational/mentor-select-presentational';

export class MentorSelect extends Component {
    constructor(props) {
        super(props);
        this.options = null;        
    }

    componentWillMount() {
        // making options array to send to Select component
        const options = [];

        for (let key in this.props.options) {
          options.push({
            value: key, label: key.toString()
          })
        }
        this.options = options;
      }
    render() {
        return (
            <MentorSelectPresentational value={this.props.value} onChange={this.props.onChange} options={this.options}/>            
        );
    }
}