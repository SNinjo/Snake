import { memo } from 'react';
import { Maps } from '../class/Maps';
import Block from './BlockFrontend';


let RowBlock = (props: { intY: number, rowColor: Array<string> }) => {
    let intRowNumber = props.intY;

    let arrTagBlockEachRow = [];
    for (let intColumnNumber = 0; intColumnNumber < Maps.getWidth(); intColumnNumber++){
      arrTagBlockEachRow.push(<Block key={intRowNumber + "_" + intColumnNumber} intX={intColumnNumber} intY={intRowNumber} strColor={props.rowColor[intColumnNumber]}></Block>);
    }

    return (
        <div>
            {arrTagBlockEachRow}
        </div>
    );
}
export default memo(RowBlock);