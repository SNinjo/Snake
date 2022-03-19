import { CSSProperties, memo } from 'react';
import Map from '../class/Map';
import Block from './Block';


let RowBlock = (props: { intY: number, rowColor: Array<string> }) => {
    let intRowNumber = props.intY;

    let arrTagBlockEachRow = [];
    for (let intColumnNumber = 0; intColumnNumber < Map.getWidth(); intColumnNumber++){
      arrTagBlockEachRow.push(<Block key={intRowNumber + "_" + intColumnNumber} intX={intColumnNumber} intY={intRowNumber} strColor={props.rowColor[intColumnNumber]}></Block>);
    }

    return (
        <div>
            {arrTagBlockEachRow}
        </div>
    );
}
export default memo(RowBlock);