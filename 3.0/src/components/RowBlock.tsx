import { CSSProperties } from 'react';
import Map from './class/Map';
import Block from './Block';


export default function RowBlock(props: { intY: number; }) {
    let intRowNumber = props.intY;

    let arrTagBlockEachRow = [];
    for (let intColumnNumber = 0; intColumnNumber < Map.getWidth(); intColumnNumber++){
      arrTagBlockEachRow.push(<Block key={intRowNumber + "_" + intColumnNumber} intX={intColumnNumber} intY={intRowNumber}></Block>);
    }

    return (
        <div>
            {arrTagBlockEachRow}
        </div>
    );
}