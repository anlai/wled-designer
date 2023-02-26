import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DesignEditor from '../DesignEditor/DesignEditor';
import DesignLayout from '../DesignLayout/DesignLayout';
import CollapsableCard from '../CollapsableCard/CollapsableCard';
import DesignActions from '../DesignActions/DesignActions';
import DesignTools from '../DesignTools/DesignTools';
import DesignExamples from '../DesignExamples/DesignExamples';

import * as Constants from '../../Constants';
import WledCommands from '../WLEDCommands/WLEDCommands';

const Designer = () => {

    const [state, setState] = React.useState({
        pattern: 'grid',
        direction: 'snake-top-left',
        width: 16,
        height: 16,
        notes: '',
        selectedColor: Constants.DEFAULT_NODE_COLOR,
        colorHistory: [],
        nodes: Array(16*16).fill(Constants.DEFAULT_NODE_COLOR),
        showNodeTooltip: false,
        showNodeNumber: false
    });

    function updateState(updates) {
        let updated = {...state};
        for(const prop in updates) { 
            updated[prop] = updates[prop]; 
        }
        setState(updated);
    }

    function onLedNodeSelect(event) {
        let position = event.target.dataset.position;
        let nodes = state.nodes;
        nodes[position] = state.selectedColor;

        let colorHistory = state.colorHistory;
        if (!colorHistory[0] || state.selectedColor !== colorHistory[0])
        {
            colorHistory = colorHistory.filter((value)=>{ return value.hex !== state.selectedColor.hex });
            colorHistory.unshift(state.selectedColor);
        }

        updateState({nodes:nodes, colorHistory: colorHistory});
    }   

    function onDesignLoad(loadedDesign) {
        if (loadedDesign.selectedColor) {
            delete loadedDesign.selectedColor;
        }

        updateState(loadedDesign);
    }

    return (<>
        <h2 className="mt-4 mb-4">Design Editor</h2>
        <DesignEditor state={state} updateState={updateState}></DesignEditor>

        <h2 className="mt-4 mb-4">Design Layout</h2>
        <Row>
            <Col className="col-md-3">
            <DesignTools state={state} updateState={updateState}></DesignTools>

            </Col>
            <Col className="col-md-9">
                <DesignLayout 
                    pattern={state.pattern} 
                    direction={state.direction} 
                    width={state.width} 
                    height={state.height} 
                    nodes={state.nodes} 
                    showNodeTooltip={state.showNodeTooltip} 
                    showNodeNumber={state.showNodeNumber}
                    onLedClick={onLedNodeSelect}>
                </DesignLayout>
            </Col>
        </Row>

        <h2 className="mt-4 mb-4">Actions</h2>
        <DesignActions state={state} onDesignLoad={onDesignLoad}></DesignActions>

        <h2 className="mt-4 mb-4">WLED Commands</h2>
        <WledCommands nodes={state.nodes}></WledCommands>

        <h2 className="mt-4 mb-4">Examples</h2>
        <DesignExamples onDesignLoad={onDesignLoad}></DesignExamples>

        <div style={{ visibility: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'visible' : 'hidden' }}>
            <h2 className="mt-4 mb-4">Debug</h2>
            <CollapsableCard header="Debug Output" className="mt-4">
                <pre>{JSON.stringify(state,null, '  ')}</pre>
            </CollapsableCard>
        </div>
    </>);

}

export default Designer;