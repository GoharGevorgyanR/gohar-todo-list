import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../task/Task';
import styles from './todo.module.css';
import ConfirmDialog from '../ConfirmDialog';
import TaskModal from '../taskModal/TaskModal';
import TaskApi from '../../api/taskApi';


const taskApi = new TaskApi();

function ToDo() {
    const [tasks, setTasks] = useState([]);
    //const [newTaskTitle, setNewTaskTitle] = useState('');
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    useEffect(() => {
        taskApi.getAll().then((tasks) => {
            setTasks(tasks);
        });

        // fetch(apiUrl+'/task', {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },

        // })
        //     .then((result) => result.json())
        //     .then((tasks) => {            
        //         setTasks(tasks);            
        //     })
    }, []);

      const handleInputChenge = (event) => {
        // setNewTaskTitle(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.code === 'Enter') {
            onAddNewTask();
        }
    };

    const onAddNewTask = (newTask) => {
        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success('The task has been added successfully!');

            })
            .catch((err) => {
                console.log("err", err);
                toast.error(err.message);
                
            });
    };

    const onTaskDelete = (taskId) => {
        const newTasks = tasks.filter(task => task._id !== taskId);
        setTasks(newTasks);


        if (selectedTasks.has(taskId)) {
            const newSelectedTasks = new Set(selectedTasks);
            newSelectedTasks.delete(taskId);
            setSelectedTasks(newSelectedTasks);
        }
    };

    const onTaskSelect = (taskId) => {
        const selectedTasksCopy = new Set(selectedTasks);
        if (selectedTasksCopy.has(taskId)) {
            selectedTasksCopy.delete(taskId);
        }
        else {
            selectedTasksCopy.add(taskId);
        }
        setSelectedTasks(selectedTasksCopy);
    };

    const deleteSelectedTasks = () => {
        const newTasks = [];

        tasks.forEach((task) => {
            if (!selectedTasks.has(task._id)) {
                newTasks.push(task);
            }
        });
        setTasks(newTasks)
        setSelectedTasks(new Set());
        setIsConfirmDialogOpen(false);
    };

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen)

    };

    let newTaskTitle = "";

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


                        <Button
                            variant="success"
                            onClick={() => setIsAddTaskModalOpen(true)}
                        //disabled={!newTaskTitle.trim()}
                        >
                            Add new task
                        </Button>

                    </Col>
                </Row>

                <Row>
                    {tasks.map((task) => {
                        return (
                            <Task
                                key={task._id}
                                data={task}
                                onTaskDelete={onTaskDelete}
                                onTaskSelect={onTaskSelect}
                            />
                        )
                    })}
                </Row>

                <Button
                    className={styles.deleteSelected}
                    variant="danger"
                    onClick={toggleConfirmDialog}
                    disabled={!selectedTasks.size}
                >
                    Delete selected
                </Button>

                {isConfirmDialogOpen &&
                    <ConfirmDialog
                        tasksCount={selectedTasks.size}
                        onCancel={toggleConfirmDialog}
                        onSubmit={deleteSelectedTasks} />


                }
                {isAddTaskModalOpen &&
                    <TaskModal
                        onCancel={() => setIsAddTaskModalOpen(false)}
                        onSave={onAddNewTask}
                    />
                }

                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

            </Container>

        </div>
    )
}


export default ToDo