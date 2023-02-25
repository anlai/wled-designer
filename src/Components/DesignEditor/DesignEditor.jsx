import React from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import * as Constants from '../../Constants';

const DesignEditor = ({state,updateState}) => {

    function onChange(e) {
        let prop = e.target.name;
        let val = e.target.value;
        let type = e.target.type;
        let name = e.target.name;

        let updates = {};
        updates[prop] = type === 'number' ? parseInt(val) : val;

        if (name === 'height' || name === 'width') {
            let width = name === 'width' ? updates['width'] : state.width;
            let height = name === 'height' ? updates['height'] : state.height;

            if (width > 0 && height > 0) {
                var nodes = [];
                for(let i = 0; i < width*height; i++) {
                    nodes[i] = Constants.DEFAULT_NODE_COLOR;
                }

                updates.nodes = nodes;
            }
        }

        updateState(updates);
    }

    return (<>
        <Row>
            <Form.Group className="col-sm-3">
                <Form.Label>Pattern</Form.Label>
                <Form.Select name="pattern" onChange={onChange} value={state.pattern}>
                    { Constants.DESIGN_PATTERNS.map((item)=> <option key={item.value} value={item.value}>{item.name}</option>) }
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-sm-3">
                <Form.Label>Direction</Form.Label>
                <Form.Select name="direction" onChange={onChange} value={state.direction}>
                    { Constants.DESIGN_DIRECTIONS.filter((item)=> item.pattern === state.pattern)
                            .map((item)=> <option key={item.value} value={item.value}>{item.name}</option>)  }
                </Form.Select>
            </Form.Group>
            <Form.Group className="col-sm">
                <Form.Label>Width</Form.Label>
                <Form.Control type="number" name="width" value={state.width} onChange={onChange}></Form.Control>
            </Form.Group>
            <Form.Group className="col-sm">
                <Form.Label>Height</Form.Label>
                <Form.Control type="number" name="height" value={state.height} onChange={onChange}></Form.Control>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" name="notes" value={state.notes} rows={3} onChange={onChange}></Form.Control>
            </Form.Group>
        </Row>
    </>);
}

export default DesignEditor;