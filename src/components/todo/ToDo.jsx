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
    const [selectedTasks, setSelectedTasks] = useState(new Set());
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [editableTask, setEditableTask] = useState(null);

    useEffect(() => {
        taskApi.getAll()
    .then((tasks) => {
      setTasks(tasks);
    })
    .catch((err) => {
      toast.error(err.message);
    });
  }, []);

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
                toast.error(err.message);
            });
    };

    const onTaskDelete = (taskId) => {
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
            });
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
            });


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

    //let newTaskTitle = "";

    const onEditTask = (editedTask) => {
        taskApi
            .update(editedTask)
            .then((task) => {
                toast.success(`Tasks havs been updated successfully!`);
                setEditableTask(null);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

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

                <Row className="justify-content-center m-3" >
                    <Col xs="6" sm="4" md="3">


                        <Button
                            variant="success"
                            onClick={() => setIsAddTaskModalOpen(true)}

                        >
                            Add new task
                        </Button>
                    </Col>

                    <Col xs="6" sm="4" md="3">
                        <Button variant="warning" onClick={selectAllTasks}>
                            Select all
                        </Button>
                    </Col>
                    <Col xs="6" sm="4" md="3">
                        <Button variant="secondary" onClick={resetSelectedTasks}>
                            Reset selected
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
                                checked={selectedTasks.has(task._id)}
                                onTaskEdit={setEditableTask}
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

                {editableTask &&
                    <TaskModal
                        onCancel={() => setEditableTask(null)}
                        onSave={onEditTask}
                        data={editableTask}
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