import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const LedNode = ({position, color, showNodeTooltip, onClick}) => {

    const renderTooltip = (props) => (
        <Tooltip id="led-tooltip" {...props}>
            {position}
        </Tooltip>
    );

    const nodeStyle = { backgroundColor: color.hex };

    const node = (<div className="led-node" data-position={position} style={nodeStyle} onClick={onClick}>&nbsp;</div>); 

    if (showNodeTooltip) {
        return (<OverlayTrigger placement="bottom" delay={{ show: 250, hide: 0 }} overlay={renderTooltip}>
                {node}
            </OverlayTrigger>
        );
    }

    return (<>{node}</>);
}

export default LedNode;