import React from 'react';
import { SketchPicker } from 'react-color';
import { Form, Button } from 'react-bootstrap';
import { ArrowDownUp, ArrowLeftRight} from 'react-bootstrap-icons';

import * as Constants from '../../Constants';

const DesignTools = ({state, updateState}) => {
    
    const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];
    const RESET_CANVAS = 'RESET_CANVAS';
    const SET_CANVAS = 'SET_CANVAS';
    const FLIP_HORIZONTAL = 'FLIP_HORIZONTAL';
    const FLIP_VERTICAL = 'FLIP_VERTICAL';

    function resetCanvas(color) {
        let nodes = state.nodes;
        for (let i = 0; i < nodes.length; i++) {
            nodes[i] = color ?? Constants.DEFAULT_NODE_COLOR;
        }

        updateState({nodes: nodes});
    }

    function flipNodesHorizontal() {
        // this assumes the snaking method goes from side to side
        // where each chunk is a straight range and represents a row
        var chunks = sliceIntoChunks(state.nodes,state.width);
        chunks.forEach(element => element.reverse());

        updateState({nodes: chunks.flat()});
    }

    // split an array into chunks (handle the "rows")
    function sliceIntoChunks(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    function flipNodesVertical() {
        // this assumes the snaking method goes from side to side
        // each chunk represents the nth node in each row
        var chunks = sliceIntoChunks(state.nodes,state.width);
        chunks.forEach(item=> item = item.reverse());
        let output = chunks.reverse();
        updateState({nodes: output.flat()});
    }

    function updateColor(color) {
        updateState({selectedColor: { hex: color.hex, hsv: color.hsv }});
    }

    const handleClick = (e) => {
        let target = e.target;
        if (target.type !== 'button') {
            target = target.parentElement;
        }

        switch(target.dataset.action)
        {
            case RESET_CANVAS:
                resetCanvas();
                break;
            case SET_CANVAS:        
                resetCanvas(state.selectedColor);
                break;
            case FLIP_HORIZONTAL:   
                flipNodesHorizontal();
                break;
            case FLIP_VERTICAL:     
                flipNodesVertical();
                break;

            default:
                console.warn(`invalid action: ${target.dataset.action}`);
                break;
        }
    }

    return (<>
        <SketchPicker disableAlpha={true} color={state.selectedColor} presetColors={presetColors} onChange={updateColor}></SketchPicker>
        
        <div className="d-grid gap-3 mx-auto mt-3" style={{ width: '200px' }}>
            <div className="d-grid gap-2">
                <strong>Current Color</strong>
                <div style={ {backgroundColor: state.selectedColor.hex, height: '20px', width: '100%' } }></div>
            </div>
            <div className="d-grid gap-2">
                <strong>Color History</strong>
                {state.colorHistory.slice(0,10).map((item,index) => {
                        return <div key={index} 
                                style={ { backgroundColor: item.hex, height: '20px', width: '100%' } }
                                onClick={()=> { updateColor(item); }} >
                        </div>;
                    })}
            </div>
            <strong>Actions</strong>
            <Form.Check label="Show Node Tooltip" checked={state.showNodeTooltip} onChange={() => { updateState({ showNodeTooltip: !state.showNodeTooltip }); }}></Form.Check>
            <Form.Check label="Show Node Number" checked={state.showNodeNumber} onChange={() => { updateState({ showNodeNumber: !state.showNodeNumber }); }}></Form.Check>
        </div>
        <div>
            <Button data-action={RESET_CANVAS} className="mx-1 mb-1 mt-2 col-md-5" onClick={handleClick}>Reset</Button>
            <Button data-action={SET_CANVAS} className="mx-1 mb-1 mt-2 col-md-5" onClick={handleClick}>Set All</Button>
            <Button data-action={FLIP_HORIZONTAL} className="mx-1 mt-1 col-md-5" onClick={handleClick}>Flip <ArrowLeftRight /></Button>
            <Button data-action={FLIP_VERTICAL} className="mx-1 mt-1 col-md-5" onClick={handleClick}>Flip <ArrowDownUp /></Button>
        </div>
    </>);
}

export default DesignTools;