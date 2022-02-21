import { CSSProperties, useState } from 'react';
import classBlock from './class/Block';


export default function Block(props: { intX: number; intY: number; }) {
    const [intSquareSizeByPx, setSquareSizeByPx] = useState(classBlock.getSquareSizeByPx());
    // const [strBlockColor, setBlockColor] = useState(classBlock.getSquareSizeByPx());

    function updateSquareBlockSize(){
        classBlock.setSquareBlockSize( document.getElementById("mainContainer") as HTMLInputElement );
        setSquareSizeByPx(classBlock.getSquareSizeByPx());
    }
    window.addEventListener("load", () => updateSquareBlockSize())
    window.addEventListener("resize", () => updateSquareBlockSize());


    let cssOuterBlock: CSSProperties = {
        width: intSquareSizeByPx + 'px',
        height: intSquareSizeByPx + 'px',

        display: 'inline-block',
    }

    let cssInnerBlock: CSSProperties = {
        width: '80%',
        height: '80%',

        position: 'relative',
        left: '10%',
        top: '10%',

        backgroundColor: classBlock.strBackgroundColor,
    }


    return (
        <div style={cssOuterBlock}>
            <div style={cssInnerBlock}></div>
        </div>
    );
}