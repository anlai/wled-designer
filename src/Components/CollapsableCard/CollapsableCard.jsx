import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const CollapsableCard = ({header,children, className}) => {

    const [open, setOpen] = useState(false);

    return (<>
        <Card className={className}>
            <Card.Header className="d-flex justify-content-between">
                {header}
                <Button onClick={() => setOpen(!open)}>Show/Hide</Button>
            </Card.Header>
            <Card.Body>
                <Collapse in={open}>
                    {children}
                </Collapse>
            </Card.Body>
        </Card>
    </>);
}

export default CollapsableCard;