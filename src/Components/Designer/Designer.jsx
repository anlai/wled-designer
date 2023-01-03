import React from 'react';
import Card from 'react-bootstrap/Card';
import DesignEditor from '../DesignEditor/DesignEditor';
import DesignLayout from '../DesignLayout/DesignLayout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SketchPicker } from 'react-color';
import CollapsableCard from '../CollapsableCard/CollapsableCard';

const Designer = () => {

    const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];

    // represents "off" of an led node
    const defaultColor = { 
        hex: "#000000",
        rgb: { r: 0, g: 0, b: 0, a: 1 }
    };

    const [state, setState] = React.useState({
        pattern: 'grid',
        direction: 'snake-top-left',
        width: 16,
        height: 16,
        selectedColor: defaultColor,
        nodes: Array(16*16).fill(defaultColor)
    });

    function updateState(updates) {
        let updated = {...state};
        for(const prop in updates) { updated[prop] = updates[prop]; }
        setState(updated);
    }

    function updateEditor(e) {
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
                    nodes[i] = {r:0,g:0,b:0};
                }

                updates.nodes = nodes;
            }
        }

        updateState(updates);
    }

    function updateColor(color,event) {
        updateState({selectedColor: color});
    }

    function onLedNodeSelect(event) {
        let position = event.target.dataset.position;
        let nodes = state.nodes;
        nodes[position] = state.selectedColor;
        updateState({nodes:nodes});
    }   

    return (<>
        <h2 className="mt-4 mb-4">Design Editor</h2>
        <DesignEditor pattern={state.pattern} direction={state.direction} width={state.width} height={state.height} onChange={updateEditor}></DesignEditor>

        <h2 className="mt-4 mb-4">Design Layout</h2>
        <Row>
            <Col className="col-md-3">
                <SketchPicker disableAlpha={true} color={state.selectedColor} presetColors={presetColors} onChange={updateColor}></SketchPicker>

                <div style={{ margin: 'auto', width: '200px', paddingTop: '15px' }}>
                    Current Color
                    <div style={ {backgroundColor: state.selectedColor.hex, height: '20px', width: '100%' } }></div>
                </div>
            </Col>
            <Col className="col-md-9">
                <DesignLayout pattern={state.pattern} direction={state.direction} width={state.width} height={state.height} nodes={state.nodes} onLedClick={onLedNodeSelect}></DesignLayout>
            </Col>
        </Row>

        <CollapsableCard header="Debug Output" className="mt-4">
            <pre>{JSON.stringify(state,null, '  ')}</pre>
        </CollapsableCard>
    </>);

}

export default Designer;