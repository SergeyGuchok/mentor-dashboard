const xlsx = require('node-xlsx');
const path = require('path');
const constants = require('../constants');
const fs = require('fs');

const finalObject = {
    mentors: {},
    tasks: [],
};

const scoreObject = {};

const mentorScore = xlsx.parse(`${path.resolve('../excel-files')}/Mentor score.xlsx`)[0].data;
const pairs = xlsx.parse(`${path.resolve('../excel-files')}/Mentor-students pairs.xlsx`);
const students = pairs[0].data;
const mentors = pairs[1].data;

const tasks = xlsx.parse(`${path.resolve('../excel-files')}/Tasks.xlsx`)[0].data;

// remove columns name
students.shift();
mentorScore.shift();

// filling final object with mentors and their students
students.forEach(pair => {
    // check if array is empty
    if (!pair.length) {
        return;
    }
    if (finalObject.mentors[pair[0].toLowerCase().trim()]) {
        finalObject.mentors[pair[0].toLowerCase()].students.push({
            studentName: constants.githubLink.concat(pair[1])
        });
    } else {
        finalObject.mentors[pair[0].toLowerCase()] = {
            mentorGitHub: null,
            students: [{
                studentName: constants.githubLink.concat(pair[1])
            }]
        }
    }
});

// filling final object with mentor github info
mentors.forEach(mentor => {
    if (!mentor.length) {
        return;
    }

    // taking first and second mentor`s name from array
    const mentorName = `${mentor[0]} ${mentor[1]}`.toLowerCase();

    // taking mentor`s github link from array
    const mentorGitHub = mentor[4];

    if (finalObject.mentors[mentorName]) {
        finalObject.mentors[mentorName].mentorGitHub = mentorGitHub;
    }
})

// remove columns name
tasks.shift();

// fill tasks array in finalObject
tasks.forEach(task => {
    const taskInfo = {}

    taskInfo.taskName = task[0].trim();
    taskInfo.taskLink = task[1] || 'No link provided';
    taskInfo.taskStatus = task[2];

    switch (task[2].toUpperCase()) {
        case constants.taskStatus.toDo.toUpperCase():
            taskInfo.statusText = constants.taskStatus.toDo;
            break;
        case constants.taskStatus.checked.toUpperCase():
            taskInfo.statusText = constants.taskStatus.checked;
            break;
        case constants.taskStatus.checking.toUpperCase():
            taskInfo.statusText = constants.taskStatus.checking;
            break;
        case constants.taskStatus.inProgress.toUpperCase():
            taskInfo.statusText = constants.taskStatus.inProgress;
            break;
        default:
            taskInfo.statusText = 'Invalid status';
    }

    finalObject.tasks.push(taskInfo);
});

mentorScore.forEach(score => {
    if (!scoreObject[score[1].trim()]) {
        scoreObject[score[1].trim()] =
            [{
                student: score[2].trim(),
                tasks: {
                    task: score[3].trim(),
                    score: score[5],
                }
            }]
    } else {
        scoreObject[score[1].trim()].push({
            student: score[2].trim(),
            tasks: {
                task: score[3].trim(),
                score: score[5],
            }
        })
    }
})

finalObject.score = scoreObject;

fs.writeFile(path.resolve('../src/data.json'), JSON.stringify(finalObject, null, 4), (err) => {
    if (err) {
        console.log(err);
    }
})
