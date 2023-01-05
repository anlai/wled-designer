import React from 'react';
import LedNode from '../LedNode/LedNode';

const DesignLayout = ({pattern,direction,width,height,nodes,showNodeNumber,onLedClick}) => {

    function generateGrid(dir) {
        let counter = 0;
        let result = [];
        for(let row = 0; row < height; row++) {
            let rowArray=[];
            for(let col = 0; col < width; col++) {
                rowArray.push(<LedNode position={counter} color={nodes[counter]} showNodeNumber={showNodeNumber} onClick={onLedClick}></LedNode>);
                counter++;
            }

            if (row%2 === 1) rowArray = rowArray.reverse();

            result.push(rowArray);
        }

        if (dir === 'snake-top-right') {
            for(let row of result) { row = row.reverse(); }
        }
        else if (dir === 'snake-bottom-left') {
            result = result.reverse();
        }
        else if (dir === 'snake-bottom-right') {
            for(let row of result) { row = row.reverse(); }
            result = result.reverse();
        }

        return result;
    }

    // create the grid design
    let layout = [];
    switch(pattern)
    {
        case 'grid':
            layout = generateGrid(direction);
            break;
        default:
            layout = generateGrid('snake-top-left');
    }

    return (<div id="wled-layout">
        {layout.map((item,index)=>{ return <div className="wled-row">{item}</div>; })}
        </div>);
}

export default DesignLayout;