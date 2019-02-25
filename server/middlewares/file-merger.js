const xlsx = require('node-xlsx');
const path = require('path');
const constants = require('../../constants');
const fs = require('fs');

module.exports = function fileMerger(req, res, next) {
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
    // console.log(pairs[1].data);
    // console.log(mentorScore[0].data);
    // console.log(tasks[0].data);

    // remove columns name
    students.shift();

    // filling final object with mentors and their students
    students.forEach(pair => {
        // check if array is empty
        if (!pair.length) {
            return;
        }
        if (finalObject.mentors[pair[0].toLowerCase()]) {
            finalObject.mentors[pair[0].toLowerCase()].students.push({
                studentName: constants.githubLink.concat(pair[1]),
                tasks: {}
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

        taskInfo.taskName = task[0];
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
        if (!scoreObject[score[1]]) {
            scoreObject[score[1]] = {
                students: [{
                    student: score[2],
                    tasks: {
                        task: score[3],
                        score: score[5],
                    }
                }]
            }
        } else {
            scoreObject[score[1]].students.push({
                student: score[2],
                tasks: {
                    task: score[3],
                    score: score[5],
                }
            })
        }
    })

    finalObject.score = scoreObject;
    console.log(scoreObject);

    fs.writeFile(path.resolve('../text.json'), JSON.stringify(finalObject, null, 4), (err) => {
        if (err) {
            console.log(err);
        }
    })

    res.finalObject = finalObject;
    next();
}