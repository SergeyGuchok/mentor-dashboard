import React from 'react';

export default function Legend() {
    return (
        <table className="legend">
            <tbody>
                <tr>
                    <td className="green-colored"></td>
                    <td>Task is checked</td>
                </tr>
                <tr>
                    <td className="pink-colored"></td>
                    <td>Task need to be checked</td>
                </tr>
                <tr>
                    <td className="orange-colored"></td>
                    <td>Task is in progress</td>
                </tr>
                <tr>
                    <td className="blue-colored"></td>
                    <td>Task need to be created (ToDo status)</td>
                </tr>
                <tr>
                    <td className="white-colored"></td>
                    <td>No information given</td>
                </tr>
                <tr>
                    <td className="red-colored"></td>
                    <td>Time is gone, no mark from mentor</td>
                </tr>
            </tbody>
        </table>
    )
}