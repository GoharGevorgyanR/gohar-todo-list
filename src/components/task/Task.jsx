import {memo} from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css'


function Task(props) {
    const task = props.data;
    return (
        <Col xs={12} sm={6} md={4} lg={3}  >
            <Card className='mb-2 mt-2'>
                <Card.Body>
                    <Form.Check className={styles.checkBox}
                    onClick={()=>props.onTaskSelect(task._id)}
                    />
                
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        Descripion
                    </Card.Text>
                    <div className={styles.delEditButton}>
                        <Button variant="warning">
                            <FontAwesomeIcon icon={faPen} />
                        </Button>
                        <Button variant="danger" 
                        className={styles.deleteButton}
                         onClick={()=>{                            
                            props.onTaskDelete(task._id);
                            
                        }}
                        
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )

    Task.propTypes = {
        data: PropTypes.object.isRequired,
        onTaskSelect: PropTypes.func.isRequired,
        onTaskDelete: PropTypes.func.isRequired,
    }
}

export default memo(Task);