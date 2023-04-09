

import { Modal, Button } from 'react-bootstrap';

function ConfirmDialog(props) {
    return(
        <Modal
        show={true}
        onHide={ props.onCancel }
       
      >
       
        <Modal.Body>
         Are you sure to delete {props.tasksCount} {props.tasksCount > 1 ? "tasks" : "task"} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"
          onClick={props.onCancel} >
            Cancel
          </Button>
          <Button variant="danger"
           onClick={props.onSubmit}           

          >Delete</Button>
        </Modal.Footer>
      </Modal>
    )    
}

export default  ConfirmDialog;