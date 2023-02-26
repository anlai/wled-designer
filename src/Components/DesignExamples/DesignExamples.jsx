import React from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';

const DesignExamples = ({onDesignLoad}) => {

    const examples = [
        { id: 'basic_palette', name: 'Basic Palette', size: '2x2' },
        { id: 'mario', name: 'Mario', size: '16x16' },
        { id: 'mushroom', name: 'Mushroom', size: '16x16' },
        { id: 'mickey', name: 'Mickey', size: '16x16' },
        { id: 'minnie', name: 'Minnie', size: '16x16' },
        { id: 'red_ghost', name: 'Red Ghost', size: '16x16' },
        { id: 'yoshi', name: 'Yoshi', size: '16x16' }
    ];

    const halfIndex = Math.ceil(examples.length/2);
    const firstHalf = examples.slice(0,halfIndex);
    const secondHalf = examples.slice(halfIndex);

    function ListItem(item) {
        return (
            <ListGroup.Item key={item.id} action onClick={onClick} data-id={item.id} className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">{item.name}</div>
                <Badge bg="primary">{item.size}</Badge>
            </ListGroup.Item>);
    }

    function onClick(e) {

        let button = e.target;

        // deal with the child elements getting the click event
        if (button.nodeName !== 'BUTTON' && button.parentNode.nodeName === 'BUTTON') {
            button = button.parentNode;
        }

        if (button.dataset.id) {
            fetch(`${process.env.PUBLIC_URL}/examples/${button.dataset.id}.json`)
                .then((res) => res.json())
                .then((data) => {
                    onDesignLoad(data);
                });
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <ListGroup as="ul">
                        { firstHalf.map((item)=> ListItem(item)) }
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup as="ul">
                        { secondHalf.map((item)=> ListItem(item)) }
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
}

export default DesignExamples;