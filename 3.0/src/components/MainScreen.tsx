import { useEffect, useState, useRef, memo, CSSProperties  } from 'react';

import SnakeGame from '../class/SnakeGame';
import { Maps, Position } from '../class/Maps';

import RowBlock from './RowBlock';
import Menu from './Menu';


let MainScreen = () => {
    const isFirstRender = useRef(true);

    // 聚焦在 MainScreen 的 div 上
    const focusDiv = useRef() as React.MutableRefObject<HTMLInputElement>;
    let focusOnMainScreen: Function = () => {
        if(focusDiv.current) focusDiv.current.focus();
    }
    useEffect(() => focusOnMainScreen(), [focusDiv]);
    
    const [arr2Color, setColor] = useState(Maps.getColors());
    const [strGameState, setGameState] = useState("ready"); // ready | play | pause | over | pass
    let changeGameState: Function = (strNewGameState: string) => setGameState(strNewGameState);


    if (isFirstRender.current) {
        SnakeGame.changeToOverState = () => setGameState("over");
        SnakeGame.changeToPassState = () => setGameState("pass");
        Maps.updateMainScreen = () => setColor(Maps.getColors());

        SnakeGame.addPlayerByDefault(new Position(0, 0), "right", "red");
        SnakeGame.addPlayerByDefault(new Position((Maps.getWidth() - 1), 0), "down", "blue");

        SnakeGame.initialize();
    }


    let triggerFunctionKeys: React.KeyboardEventHandler<HTMLDivElement> = (event: any) => {
        switch (event.key){
            case "Escape":
                setGameState("ready");
                SnakeGame.exit();
                break;

            case " ":
            case "p":
                if (strGameState === "play"){
                    setGameState("pause");
                    SnakeGame.pause();
                }
                else if (strGameState === "pause") {
                    setGameState("play");
                    SnakeGame.start();
                }
                break;

            case "r":
                setGameState("play");
                SnakeGame.restart();
                break;
        }
    }

    let pauseGame: React.MouseEventHandler<HTMLDivElement> = () => {
        if (strGameState === "play") {
            setGameState("pause");
            SnakeGame.pause();
        }
    }

    
    let arr2TagBlock: Array<JSX.Element> = [];
    for (let intRowNumber = 0; intRowNumber < Maps.getHeight(); intRowNumber++){
        arr2TagBlock.push(<RowBlock key={intRowNumber} intY={intRowNumber} rowColor={arr2Color[intRowNumber]}></RowBlock>);
    }

    let css: CSSProperties = {
        position: "relative",
        outline: "none",
    }
    isFirstRender.current = false;
    return (
        <div style={css} onClick={pauseGame} onKeyDown={triggerFunctionKeys} tabIndex={0} ref={focusDiv}>
            <Menu gameState={strGameState} setGameState={changeGameState} focusOnMainScreen={focusOnMainScreen} />
            {arr2TagBlock}
        </div>
    );
}
export default memo(MainScreen);