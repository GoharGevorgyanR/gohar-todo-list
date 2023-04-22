import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import styles from './taskModal.module.css';


function TaskModal(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [isTitleValid, setIsTitleValid] = useState(false);

    const saveTask = ()=>{
        const newTask = {
          title: title.trim(),
          description: description.trim(),
        //   date: date.toLocaleDateString()
        };
          props.onSave(newTask);
      };
    

    const onTitleChange = (event) => {
        const {value}  = event.target;
        const trimmedTitle = value.trim();

        setIsTitleValid(!!trimmedTitle);
        setTitle(value);
    }


    return (
        <Modal show={true} onHide={props.onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Add new task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Control
                    placeholder="Title"
                    className={`${!isTitleValid ? styles.invalid: ''} mb-2 `}
                    value={title}
                    onChange={onTitleChange}
                />
                <Form.Control as="textarea" rows={4}
                    className='mb-2'
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <h6>Deadline</h6>
                <DatePicker
                    showIcon
                    selected={date}
                    onChange={setDate}
                />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary"
                    onClick={props.onCancel} >
                    Cancel
                </Button>
                <Button variant="success"
                    onClick={saveTask}
                    disabled={!isTitleValid}
                >Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

TaskModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};
export default TaskModal  