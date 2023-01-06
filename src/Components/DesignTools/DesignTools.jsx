import React from 'react';
import { SketchPicker } from 'react-color';
import Form from 'react-bootstrap/Form';

const DesignTools = ({selectedColor, colorHistory, updateColor, toggleNodeNumber}) => {
    const presetColors = ['#FF0000', '#00FF00', '#0000FF', '#000000'];

    return (<>
        <SketchPicker disableAlpha={true} color={selectedColor} presetColors={presetColors} onChange={updateColor}></SketchPicker>
        
        <div style={{ margin: 'auto', width: '200px', paddingTop: '15px' }}>
            <div>
                Current Color
                <div style={ {backgroundColor: selectedColor.hex, height: '20px', width: '100%' } }></div>
            </div>
            <div className="mt-2">
                Color History
                {colorHistory.slice(0,10).map((item,index) => {
                        return <div key={index} 
                                className="mt-2" 
                                style={ { backgroundColor: item.hex, height: '20px', width: '100%' } }
                                onClick={()=> { updateColor(item); }} >
                        </div>;
                    })}
            </div>
            <div className="mt-2">
                <Form.Check label="Show Node Number" className="mt-4" onChange={toggleNodeNumber}></Form.Check>
            </div>
        </div>
    </>);
}

export default DesignTools;