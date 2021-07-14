import React, { Component } from 'react';

export class ToDo extends Component {
    static displayName = ToDo.name;

    constructor(props) {
        super(props);
        this.state = { tasks: [], loading: true };
    }

    componentDidMount() {
        this.populateTaskData();
    }

    static renderTasksTable(tasks) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>   </th>
                        <th>Task</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task, id =>
                        <tr key={id}>
                            <td>{task.complete}</td>
                            <td>{task.name}</td>
                            <td>{task.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ToDo.renderTaskTable(this.state.tasks);

        return (
            <div>
                <h1 id="tabelLabel" >To Do List</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateTaskData() {
        const response = await fetch('tasklist');
        const data = await response.json();
        this.setState({ tasks: data, loading: false });
    }
}
