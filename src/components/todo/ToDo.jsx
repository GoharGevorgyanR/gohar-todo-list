import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap';
import { idGenerator } from '../../utils/helpers';
import Task from '../task/Task';
import styles from './todo.module.css'



class ToDo extends Component {
    state = {
        tasks: [],
        newTask: "",
        selectedTasks: new Set(),
    };

    handleInputChenge = (event) => {
        const newTask = event.target.value;
        this.setState({
            newTask
        })
    };

    handleInputKeyDown = (event) => {
        if (event.code === 'Enter') {
            this.addNewTask();
        }
    };

    addNewTask = () => {
        if (this.state.newTask.trim() === '') {
            return;
        }
        const newTask = {
            id: idGenerator(),
            title: this.state.newTask
        };
        const tasks = [...this.state.tasks];
        tasks.push(newTask);
        this.setState({
            tasks,
            newTask: '',
        });
    };

    onTaskDelete = (taskId) => {
        const { selectedTasks, tasks } = this.state;
        const newTasks = this.state.tasks.filter(task => task.id !== taskId);

        const newState = {
            tasks: newTasks
        };

        if (selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);
            newSelectedTasks.delete(taskId);
            newState.selectedTasks = newSelectedTasks;
        }
        this.setState(newState);
    };

    onTaskSelect = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId)
        }
        this.setState({
            selectedTasks
        });
    };

    deleteSelectedTasks = () => {
        const newTasks = [];
        const { selectedTasks, tasks } = this.state;

        tasks.forEach((task) => {
            if (!selectedTasks.has(task.id)) {
                newTasks.push(task);
            }
        });
        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
        })
    };




    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div className="title" >
                                <h2>To Do List</h2>
                            </div>

                        </Col>
                    </Row>

                    <Row >
                        <Col xs="12" sm="8" md="6">

                            <InputGroup className="mb-3 mt-2">
                                <Form.Control
                                    placeholder="Input task title"
                                    onChange={this.handleInputChenge}
                                    onKeyDown={this.handleInputKeyDown}
                                    value={this.state.newTask}
                                />
                                <Button
                                    variant="success"
                                    onClick={this.addNewTask}
                                    disabled={!this.state.newTask.trim()}
                                >
                                    Add
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        {this.state.tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    data={task}
                                    onTaskDelete={this.onTaskDelete}
                                    onTaskSelect={this.onTaskSelect} />
                            )
                        })}
                    </Row>

                    <Button
                        className={styles.deleteSelected}
                        variant="danger"
                        onClick={this.deleteSelectedTasks}
                        disabled={!this.state.selectedTasks.size}
                    >
                        Delete selected
                    </Button>


                </Container>


            </div>
        )
    }
}

export default ToDo