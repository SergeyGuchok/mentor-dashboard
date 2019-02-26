import React, { Component } from 'react';
import TableRow from './table-row';
import FirstRow from './first-row';

export class MentorTable extends Component {
    constructor(props) {
        super(props);
        this.tasks = props.data.default.tasks;
    }

    render() {
        return (
            <div>
                {
                    this.props.mentor !== null &&
                    <table className="table">
                        <tbody>
                            <FirstRow mentor={this.props.mentor.value} />
                            {
                                this.tasks.map((task, index) => {
                                    return <TableRow key={index} task={task} mentor={this.props.mentor.value} />
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}