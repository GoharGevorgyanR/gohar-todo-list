import  {Component}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; 
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class ToDo extends Component{
    render(){
        return(
            <div>

<Container>
<Row>
    <Col>
    <h2>To Do List</h2>
    </Col>
</Row>

<Row >
    <Col md = {6}>
        <Stack direction="horizontal" gap={2}>

        <Form.Control className="me-auto" style={{ width: '40rem', margin:'10px'}} placeholder="Enter Task" />
        <Button variant="secondary">Save</Button>     
        
        </Stack>
    </Col>
</Row>

    <Row>
    
        <Col md = {3} sm={4} xs = {6}>
            <Card style={{ width: '14rem', margin:'10px' }}>        
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </Col>

        <Col md = {3} sm={4} xs = {6}>
            <Card style={{ width: '14rem', margin:'10px' }}>        
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </Col>
            
        <Col md = {3} sm={4} xs = {6}>
            <Card style={{ width: '14rem' , margin:'10px' }}>        
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </Col>
            
        <Col md = {3}  sm={4} xs = {6}>
            <Card style={{ width: '14rem', margin:'10px'}}>        
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </Col>
        
    </Row>

</Container>

            
            </div>
        )
    }
}

export default ToDo