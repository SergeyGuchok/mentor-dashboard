import React from 'react';
import * as json from '../data.json';
import constants from '../constants';

export default function TableColumn(props) {
    let className;
    switch (props.status) {
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

    const link = json.mentors[props.mentor].mentorGitHub;
    let newStudentsArray = json.score[link];

    if (!newStudentsArray) {
        return (<td className="white-colored"></td>)
    }

    // finding a right person that suit for Student Name and Task Name
    newStudentsArray = newStudentsArray.filter(obj => obj.student === props.student.studentName);
    newStudentsArray = newStudentsArray.filter(obj => obj.tasks.task === props.task);

    if (newStudentsArray.length) {
        const score = newStudentsArray[0].tasks.score;
        return (<td className="green-colored">{score}</td>)
    } else {
        if (className === 'blue-colored') {
            return (<td className={className}></td>)
        }

        if (className === 'orange-colored') {
            return (<td className={className}></td>)
        }

        if (className === 'pink-colored') {
            return (<td className={className}></td>)
        }

        if (className === 'white-colored') {
            return (<td className={className}></td>)
        }

        return (<td className='red-colored'></td>)
    }
}