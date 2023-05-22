import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Filters from "../../components/filters/Filters";
import Task from '../../components/task/Task';
import styles from './todo.module.css';
import ConfirmDialog from '../../components/ConfirmDialog';
import TaskModal from '../../components/taskModal/TaskModal';
import TaskApi from '../../api/taskApi';
import { useDispatch } from 'react-redux';

import { setLoader } from "../../redux/reducers/isLoading"

const taskApi = new TaskApi();

function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);
    


    const dispatch = useDispatch();



    const getTasks = (filters) => {
        dispatch(setLoader(true));
        taskApi.getAll(filters)
            .then((tasks) => {
                setTasks(tasks);
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                dispatch(setLoader(false));
            }, [dispatch]);
            
    };

   
    
    
    useEffect(() => {
        getTasks();
         // eslint-disable-next-line
    }, []);

    // useEffect(() => {
    //     dispatch tasks.length
    // }, [tasks.length]);


    const onAddNewTask = (newTask) => {
        dispatch(setLoader(true));
        taskApi.add(newTask)
            .then((task) => {
                const tasksCopy = [...tasks];
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setIsAddTaskModalOpen(false);
                toast.success('The task has been added successfully!');
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => dispatch(setLoader(false)));;

    };

    const onTaskDelete = (taskId) => {
        dispatch(setLoader(true));
        taskApi
            .delete(taskId)
            .then(() => {
                const newTasks = tasks.filter((task) => task._id !== taskId);
                setTasks(newTasks);
                if (selectedTasks.has(taskId)) {
                    const newSelectedTasks = new Set(selectedTasks);
                    newSelectedTasks.delete(taskId);
                    setSelectedTasks(newSelectedTasks);
                }
                toast.success("The task has been deleted successfully!");
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => dispatch(setLoader(false)));;
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
        dispatch(setLoader(true));
        taskApi
            .deleteMany([...selectedTasks])
            .then(() => {
                const newTasks = [];
                const deletedTasksCount = selectedTasks.size;
                tasks.forEach((task) => {
                    if (!selectedTasks.has(task._id)) {
                        newTasks.push(task);
                    }
                });
                setTasks(newTasks);
                setSelectedTasks(new Set());
                toast.success(
                    `${deletedTasksCount} tasks have been deleted successfully!`
                );
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => dispatch(setLoader(false)));;
        setIsConfirmDialogOpen(false);
    };

    const toggleConfirmDialog = () => {
        setIsConfirmDialogOpen(!isConfirmDialogOpen)
    };
    const selectAllTasks = () => {
        const taskIds = tasks.map((task) => task._id);
        setSelectedTasks(new Set(taskIds));
    };
    const resetSelectedTasks = () => {
        setSelectedTasks(new Set());
    };



    const onEditTask = (editedTask) => {
        dispatch(setLoader(true));
        taskApi
            .update(editedTask)
            .then((task) => {
                console.log("task", task);
                const newTasks = [...tasks];
                const foundIndex = newTasks.findIndex((t) => t._id === task._id);
                newTasks[foundIndex] = task;
                toast.success(`Tasks havs been updated successfully!`);
                setTasks(newTasks);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
              })
              .finally(()=>dispatch(setLoader(false)));;
            
    };
    const onFilter = (filters) => {
        getTasks(filters);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="title" >
                            <h1>To Do List</h1>
                        </div>

                    </Col>
                </Row>
                <Row className={styles.navBar}>

                </Row>

                <Row className=" mb-3 mt-3" >
                    <Col xs="6" sm="5" md="3">
                        <Button className=" mb-1 mt-1 "
                            variant="success"
                            onClick={() => setIsAddTaskModalOpen(true)}>
                            Add new task
                        </Button>
                    </Col>

                    <Col xs="6" sm="5" md="3">
                        <Button className=" mb-1 mt-1"
                            variant="warning"
                            onClick={selectAllTasks}>
                            Select all
                        </Button>
                    </Col>
                    <Col xs="6" sm="5" md="3">
                        <Button className=" mb-1 mt-1"
                            variant="secondary" onClick={resetSelectedTasks}>
                            Reset selected
                        </Button>
                    </Col>


                    <Col xs="6" sm="5" md="3">
                        <Button className=" mb-1 mt-1"
                            variant="danger"
                            onClick={toggleConfirmDialog}
                            disabled={!selectedTasks.size}>
                            Delete selected
                        </Button>
                    </Col>




                </Row>
                <Row>
                    <Filters onFilter={onFilter} />
                </Row>

                <Row>
                    {tasks.map((task) => {
                        return (
                            <Task
                                key={task._id}
                                data={task}
                                onTaskDelete={onTaskDelete}
                                onTaskSelect={onTaskSelect}
                                checked={selectedTasks.has(task._id)}
                                onStatusChange={onEditTask}
                                onTaskEdit={setEditableTask}
                            />
                        )
                    })}
                </Row>

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

                {editableTask &&
                    <TaskModal
                        onCancel={() => setEditableTask(null)}
                        onSave={onEditTask}
                        data={editableTask}
                    />
                }

            </Container>

        </div>
    )
}


export default ToDo;