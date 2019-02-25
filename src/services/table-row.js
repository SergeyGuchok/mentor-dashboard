import React from 'react';
import TableColumn from './table-column';
import * as json from '../data.json';
import constants from '../constants';

export default function TableRow(props) {
    let className;
    const students = json.mentors[props.mentor].students;
    switch (props.task.taskStatus) {
        case constants.checked:
            className = 'green-colored';
            break;
        case constants.checking:
            className = 'pink-colored';
            break;
        case constants.inProgress:
            className = 'orange-colored';
            break;
        case constants.toDo:
            className = 'blue-colored';
            break;
        default:
            className = 'white-colored';
    }
    return (
        <tr>
            <td className={className}>
                <a href={props.task.taskLink}>{props.task.taskName}</a>
            </td>
            {
                students.map((student, index) => {
                    return <TableColumn status={props.task.taskStatus} task={props.task.taskName} mentor={props.mentor} student={student} key={index} />
                })
            }
        </tr>
    )
}