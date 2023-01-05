import React from 'react';
import { Row, Col, ListGroup, Badge } from 'react-bootstrap';

const DesignExamples = ({onDesignLoad}) => {

    const examples = [
        { id: 'basic_palette', name: 'Basic Palette', size: '2x2' },
        { id: 'mickey_mouse', name: 'Mickey Mouse', size: '16x16' },
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
        if (e.target.dataset.id) {
            console.log(e.target.dataset.id);

            fetch(`${process.env.PUBLIC_URL}/examples/${e.target.dataset.id}.json`)
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