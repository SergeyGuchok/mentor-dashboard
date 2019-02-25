import React, { Component } from 'react';
import Select from 'react-select';

export class MentorSelectPresentational extends Component{
    render() {
        return(
            <Select
                value={this.props.value}
                onChange={this.props.onChange}
                options={this.props.options}
            />
        )
    }
}