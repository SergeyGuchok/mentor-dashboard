import React from 'react';
import * as json from '../data.json';

export default function FirstRow (props) {
    const students = json.mentors[props.mentor].students
    return (
        <tr>
            <td>Tasks:</td>
            {
                students.map((student, index) => {
                    return <td key={index}>
                        <a href={student.studentName}>{student.studentName.split('/')[3]}</a>
                    </td>
                })
            }
        </tr>
    )
}