import React from 'react';
import { Col, Row, Alert } from 'react-bootstrap';
import DesignEditor from '../DesignEditor/DesignEditor';
import DesignLayout from '../DesignLayout/DesignLayout';
import CollapsableCard from '../CollapsableCard/CollapsableCard';
import DesignActions from '../DesignActions/DesignActions';
import DesignTools from '../DesignTools/DesignTools';

const Designer = () => {

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
        notes: '',
        selectedColor: defaultColor,
        nodes: Array(16*16).fill(defaultColor),
        showNodeNumber: false
    });

    function updateState(updates) {
        let updated = {...state};
        for(const prop in updates) { 
            console.log(`updating ${prop} with ${updates[prop]}`);
            updated[prop] = updates[prop]; 
        }
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
                    nodes[i] = defaultColor;
                }

                updates.nodes = nodes;
            }
        }

        updateState(updates);
    }

    function updateColor(color) {
        updateState({selectedColor: color});
    }

    function toggleNodeNumber(e) {
        updateState({showNodeNumber: e.target.checked});
    }

    function onLedNodeSelect(event) {
        let position = event.target.dataset.position;
        let nodes = state.nodes;
        nodes[position] = state.selectedColor;
        updateState({nodes:nodes});
    }   

    function onDesignLoad(loadedDesign) {
        if (loadedDesign.selectedColor) {
            delete loadedDesign.selectedColor;
        }

        updateState(loadedDesign);
    }

    return (<>
        <h2 className="mt-4 mb-4">Design Editor</h2>
        <DesignEditor pattern={state.pattern} direction={state.direction} width={state.width} height={state.height} onChange={updateEditor}></DesignEditor>

        <h2 className="mt-4 mb-4">Design Layout</h2>
        <Row>
            <Col className="col-md-3">
            <DesignTools selectedColor={state.selectedColor} updateColor={updateColor} toggleNodeNumber={toggleNodeNumber}></DesignTools>

            </Col>
            <Col className="col-md-9">
                <DesignLayout pattern={state.pattern} direction={state.direction} width={state.width} height={state.height} nodes={state.nodes} showNodeNumber={state.showNodeNumber} onLedClick={onLedNodeSelect}></DesignLayout>
            </Col>
        </Row>

        <h2 className="mt-4 mb-4">Actions</h2>
        <DesignActions state={state} onDesignLoad={onDesignLoad}></DesignActions>

        <h2 className="mt-4 mb-4">WLED Commands</h2>
        <Alert variant="primary">Coming Soon</Alert>

        <h2 className="mt-4 mb-4">Debug</h2>
        <CollapsableCard header="Debug Output" className="mt-4">
            <pre>{JSON.stringify(state,null, '  ')}</pre>
        </CollapsableCard>
    </>);

}

export default Designer;