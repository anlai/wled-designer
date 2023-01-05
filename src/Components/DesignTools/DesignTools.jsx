import React from 'react';
import { SketchPicker } from 'react-color';
import Form from 'react-bootstrap/Form';

const DesignTools = ({selectedColor, updateColor, toggleNodeNumber}) => {

    const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];

    return (<>
        <SketchPicker disableAlpha={true} color={selectedColor} presetColors={presetColors} onChange={updateColor}></SketchPicker>
        
        <div style={{ margin: 'auto', width: '200px', paddingTop: '15px' }}>
            Current Color
            <div style={ {backgroundColor: selectedColor.hex, height: '20px', width: '100%' } }></div>

            <Form.Check label="Show Node Number" className="mt-4" onChange={toggleNodeNumber}></Form.Check>
        </div>
    </>);
}

export default DesignTools;