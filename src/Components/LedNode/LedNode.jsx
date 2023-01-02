import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const LedNode = ({position, color, onClick}) => {

    const renderTooltip = (props) => (
        <Tooltip id="led-tooltip" {...props}>
            {position}
        </Tooltip>
    );

    const nodeStyle = { backgroundColor: color.hex };

    return (<OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <div className="led-node" data-position={position} style={nodeStyle} onClick={onClick}>&nbsp;</div>
        </OverlayTrigger>
    );
}

export default LedNode;