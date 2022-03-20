import { memo, CSSProperties } from 'react';
import SnakeGame from '../class/SnakeGame';


let Menu = (props: {gameState: string, setGameState: Function, focusOnMainScreen: Function}) => {
    let css: CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "rgba(255, 255, 255, 0.5)",

        display: "flex",
        alignItems: "center",

        zIndex: "1",
    }
    let cssContainer: CSSProperties = {
        margin: "10px auto",
        width: "150px"
    }
    let cssButton: CSSProperties = {
        margin: "10px auto",
        width: "100%",

        backgroundColor: "#636363",
        color: "white",
    }
    let cssText: CSSProperties = {
        textAlign: "center",
    }
    

    let arrButtonShowInReady: Array<JSX.Element> = [
        <input key="btnStart" style={cssButton} type="button" value="Start" onClick={
            (event) => {
                event.stopPropagation();

                props.setGameState("play");
                SnakeGame.start();

                props.focusOnMainScreen();
            }
        }></input>
    ];
    let arrButtonShowInPause: Array<JSX.Element> = [
        <input key="btnBackToGame" style={cssButton} type="button" value="Back to game" onClick={
            (event) => {
                event.stopPropagation();

                props.setGameState("play");
                SnakeGame.start();

                props.focusOnMainScreen();
            }
        }></input>,
        <input key="btnRestart" style={cssButton} type="button" value="Restart" onClick={
            (event) => {
                event.stopPropagation();

                props.setGameState("play");
                SnakeGame.restart();
                
                props.focusOnMainScreen();
            }
        }></input>,
        <input key="btnExit" style={cssButton} type="button" value="Exit" onClick={
            (event) => {
                event.stopPropagation();

                props.setGameState("ready");
                SnakeGame.exit();
                
                props.focusOnMainScreen();
            }
        }></input>
    ];
    let arrTagsShowInOver: Array<JSX.Element> = [
        <h2 key="textOver" style={cssText}> Game Over </h2>,
        <input key="btnExitInOver" style={cssButton} type="button" value="Exit" onClick={
            (event) => {
                event.stopPropagation();

                props.setGameState("ready");
                SnakeGame.exit();
                
                props.focusOnMainScreen();
            }
        }></input>
    ]
    let arrTagsShowInPass: Array<JSX.Element> = [
        <h2 key="textPass" style={cssText}> Clear !! </h2>,
        <input key="btnExitInPass" style={cssButton} type="button" value="Exit" onClick={
            (event) => {
                event.stopPropagation();

                props.setGameState("ready");
                SnakeGame.exit();
                
                props.focusOnMainScreen();
            }
        }></input>
    ]
    let menu: JSX.Element = (
        <div style={css}>
            <div style={cssContainer}>
                {(props.gameState === "ready") ? arrButtonShowInReady : <></>}
                {(props.gameState === "pause") ? arrButtonShowInPause : <></>}
                {(props.gameState === "over") ? arrTagsShowInOver : <></>}
                {(props.gameState === "pass") ? arrTagsShowInPass : <></>}
            </div>
        </div>
    );


    return (
        <>
            {(props.gameState !== "play") ? menu : <></>}
        </>
    );
}
export default memo(Menu);