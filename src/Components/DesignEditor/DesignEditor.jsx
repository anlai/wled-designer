import React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const DesignEditor = ({pattern,direction,width,height,onChange}) => {
    return (<>
        <Row>
            <Form.Group className="col-sm-4">
                <Form.Label>Pattern</Form.Label>
                <Form.Select name="pattern" onChange={onChange} value={pattern}>
                    <option value="grid">Grid</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-sm">
                <Form.Label>Direction</Form.Label>
                <Form.Select name="direction" onChange={onChange} value={direction}>
                    <option value="snake-top-left">Snake (Top Left)</option>
                    <option value="snake-top-right">Snake (Top Right)</option>
                    <option value="snake-bottom-left">Snake (Bottom Left)</option>
                    <option value="snake-bottom-right">Snake (Bottom Right)</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-sm">
                <Form.Label>Width</Form.Label>
                <Form.Control type="number" name="width" value={width} onChange={onChange}></Form.Control>
            </Form.Group>
            <Form.Group className="col-sm">
                <Form.Label>Height</Form.Label>
                <Form.Control type="number" name="height" value={height} onChange={onChange}></Form.Control>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" name="notes" rows={3} onChange={onChange}></Form.Control>
            </Form.Group>
        </Row>
    </>);
}

export default DesignEditor;