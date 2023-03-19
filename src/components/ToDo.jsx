import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, InputGroup, Form, Button, Card } from 'react-bootstrap';
import { idGenerator } from '../utils/helpers';
import Task from './Task';



class ToDo extends Component {
    state = {
        tasks: [],
        newTask: "",
    };

    handleInputChenge = (event) => {
        const newTask = event.target.value;
        this.setState({
            newTask
        })
    };

    handleInputKeyDown = (event)=>{
        if(event.code === 'Enter'){
           this.addNewTask(); 
        }
    };

    addNewTask = () => {
        if(this.state.newTask.trim() === ''){
            return;
        }
        const newTask = {
            id: idGenerator(),
            title: this.state.newTask
        };
        const tasks = [...this.state.tasks];
        tasks.push(newTask);
        this.setState({ tasks,
            newTask: '',
         });
    };
    render() {       
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div class="title" >
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
                                    onKeyDown = {this.handleInputKeyDown}
                                    value = {this.state.newTask}
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
               <Task key = {task.id} data ={task}/>
            )
        })}
                    </Row>

                </Container>


            </div>
        )
    }
}

export default ToDo