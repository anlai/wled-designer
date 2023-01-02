import React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const DesignEditor = ({pattern,direction,width,height,onChange}) => {
    return (<Row>
        <Form.Group className="col-sm-4">
            <Form.Label>Pattern</Form.Label>
            <Form.Select name="pattern" onChange={onChange} defaultValue={pattern}>
                <option value="grid">Grid</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="col-sm">
            <Form.Label>Direction</Form.Label>
            <Form.Select name="direction" onChange={onChange} defaultValue={direction}>
                <option value="snake-top-left">Snake (Top Left)</option>
                <option value="snake-top-right">Snake (Top Right)</option>
                <option value="snake-bottom-left">Snake (Bottom Left)</option>
                <option value="snake-bottom-right">Snake (Bottom Right)</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="col-sm">
            <Form.Label>Width</Form.Label>
            <Form.Control type="number" name="width" onChange={onChange} defaultValue={width}></Form.Control>
        </Form.Group>
        <Form.Group className="col-sm">
            <Form.Label>Height</Form.Label>
            <Form.Control type="number" name="height" onChange={onChange} defaultValue={height}></Form.Control>
        </Form.Group>
    </Row>);
}

export default DesignEditor;