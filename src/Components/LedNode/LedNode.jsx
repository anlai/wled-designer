import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import * as Constants from '../../Constants';

const LedNode = ({position, color, showNodeTooltip, showNodeNumber, onClick}) => {

    const renderTooltip = (props) => (
        <Tooltip id="led-tooltip" {...props}>
            {position}
        </Tooltip>
    );

    const nodeStyle = { 
        backgroundColor: color.hex,
        color: color.hsv ? (color.hsv.v < .5 ? Constants.COLOR_WHITE_HEX : Constants.COLOR_BLACK_HEX) : Constants.COLOR_BLACK_HEX
    };

    const node = (<div className="led-node" data-position={position} style={nodeStyle} onClick={onClick}>
                    &nbsp;
                    {showNodeNumber ? position : ''}
                  </div>); 

    if (showNodeTooltip) {
        return (<OverlayTrigger placement="bottom" delay={{ show: 250, hide: 0 }} overlay={renderTooltip}>
                {node}
            </OverlayTrigger>
        );
    }

    return (<>{node}</>);
}

export default LedNode;