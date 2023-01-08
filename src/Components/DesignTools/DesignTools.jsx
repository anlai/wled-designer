import React from 'react';
import { SketchPicker } from 'react-color';
import { Form, Button } from 'react-bootstrap';

const DesignTools = ({selectedColor, colorHistory, updateColor, resetCanvas, toggleNodeNumber}) => {
    const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];

    return (<>
        <SketchPicker disableAlpha={true} color={selectedColor} presetColors={presetColors} onChange={updateColor}></SketchPicker>
        
        <div className="d-grid gap-2" style={{ margin: 'auto', width: '200px', paddingTop: '15px' }}>
            <div className="d-grid gap-2">
                <strong>Current Color</strong>
                <div style={ {backgroundColor: selectedColor.hex, height: '20px', width: '100%' } }></div>
            </div>
            <div className="d-grid gap-2">
                <strong>Color History</strong>
                {colorHistory.slice(0,10).map((item,index) => {
                        return <div key={index} 
                                style={ { backgroundColor: item.hex, height: '20px', width: '100%' } }
                                onClick={()=> { updateColor(item); }} >
                        </div>;
                    })}
            </div>
            <div className="d-grid gap-2">
                <strong>Actions</strong>
                <Form.Check label="Show Node Number" onChange={toggleNodeNumber}></Form.Check>
                <Button onClick={() => {resetCanvas();}}>Reset Canvas</Button>
                <Button onClick={() => {resetCanvas(selectedColor);}}>Set Canvas to Selected Color</Button>
            </div>
        </div>
    </>);
}

export default DesignTools;