import { CSSProperties, useRef, useState, memo } from 'react';
import classBlock from '../class/Block';


let Block = (props: { intX: number, intY: number, strColor: string }) => {
    const [intSquareSizeByPx, setSquareSizeByPx] = useState(classBlock.getSquareSizeByPx());

    const isFirstRender = useRef(true);
    let updateSquareBlockSize = () => {
        classBlock.setSquareBlockSize( document.getElementById("mainContainer") as HTMLInputElement );
        setSquareSizeByPx(classBlock.getSquareSizeByPx());
    }
    if (isFirstRender.current){
        window.addEventListener("load", () => updateSquareBlockSize());
        window.addEventListener("resize", () => updateSquareBlockSize());
    }


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

        backgroundColor: props.strColor,
    }

    isFirstRender.current = false;
    return (
        <div style={cssOuterBlock}>
            <div style={cssInnerBlock}></div>
        </div>
    );
}
export default memo(Block);