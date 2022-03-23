import Candy from "./Candy";
import Snake from "./Snake";
import { Maps, Position } from './Maps';
import { User, OperationKeys } from "./User";
import BlockObject from "./interface/BlockObject";


class Timer {
    private intFrameSpeedEachSecond: number = 0.5;
    private timeoutId: NodeJS.Timer | null = null;

    constructor(){}

    public start(): void {
        this.timeoutId = setInterval(SnakeGame.executeEachFrame, (this.intFrameSpeedEachSecond * 1000));
    }
    public pause(): void {
        if (this.timeoutId !== null) clearInterval(this.timeoutId);
        this.timeoutId = null;
    }

    public isExecuting(): boolean {
        return this.timeoutId !== null;
    }
}

export default class SnakeGame{
    public static changeToOverState: Function;
    public static changeToPassState: Function;

    private static intIdCounter: number = 0;
    private static mapCandys: Map<number, Candy> = new Map();
    private static mapSnakes: Map<number, Snake> = new Map();
    private static mapAliveSnakes: Map<number, Snake>;
    private static mapUser: Map<number, User> = new Map();
    private static timer: Timer = new Timer();


    public static executeEachFrame(): void {
        if (SnakeGame.mapAliveSnakes.size === 0) SnakeGame.over();
        if (Maps.isFilled()) SnakeGame.pass();
        if (SnakeGame.mapCandys.size === 0) SnakeGame.generateCandy();


        let arrSnakes: Array<Snake> = [];
        SnakeGame.mapAliveSnakes.forEach(snake => {
            if (!SnakeGame.getSnakeNextPosition(snake)) {
                SnakeGame.clearSnake(snake);
                return;
            }
            
            arrSnakes.push(snake);
        })

        arrSnakes = SnakeGame.selectSort(arrSnakes);

        SnakeGame.collideObject(arrSnakes);

        Maps.updateMainScreen();
    }

    public static initialize(): void {
        SnakeGame.mapAliveSnakes = new Map(SnakeGame.mapSnakes);
        SnakeGame.mapAliveSnakes.forEach(snake => snake.initialize());
        SnakeGame.mapCandys.forEach(candy => SnakeGame.clearCandy(candy));

        Maps.clearMaps();
        this.mapAliveSnakes.forEach(snake => {
            let positionGenerative = snake.getPositionGenerative();

            Maps.getBlock(positionGenerative.intX, positionGenerative.intY).setBlockObject(snake);
        })

        SnakeGame.generateCandy();

        Maps.updateMainScreen();
    }

    public static start(): void {
        this.timer.start();
    }
    public static pause(): void {
        this.timer.pause();
    }
    public static restart(): void {
        this.timer.pause();
        SnakeGame.initialize();
        this.timer.start();
    }
    public static exit(): void {
        SnakeGame.initialize();
        this.timer.pause();
    }
    private static over(): void {
        this.timer.pause();
        SnakeGame.changeToOverState();
    }
    static pass(): void {
        this.timer.pause();
        SnakeGame.changeToPassState();
    }
    public static isPlaying(): boolean {
        return this.timer.isExecuting();
    }


    public static addPlayerByDefault(positionGenerative: Position, strDirection: string, strColor: "red" | "yellow" | "blue" | "purple"): void {
        let intId = SnakeGame.intIdCounter++;
        let snake = new Snake(intId, positionGenerative, strDirection, strColor);
        let user = new User(intId, new OperationKeys(snake, intId));

        SnakeGame.mapSnakes.set(intId, snake);
        SnakeGame.mapUser.set(intId, user);
    }


    private static generateCandy(): void {
        let intId = Candy.getNextId();
        let positionGenerative = Maps.getRandomPositionContainingNullBlock();
        if (positionGenerative === null) return;
        let candy = new Candy(intId, positionGenerative);

        SnakeGame.mapCandys.set(intId, new Candy(intId, positionGenerative));

        Maps.getBlock(positionGenerative).setBlockObject(candy);
    }
    private static clearCandy(candy: Candy): void {
        Maps.getBlock(candy.getPositionGenerative()).clearBlockObject();
        SnakeGame.mapCandys.delete(candy.getId());
    }

    private static getSnakeNextPosition(snake: Snake): Position | null {
        let positionNext: Position = snake.getPositionHead().clone();

        switch (snake.getDirection()){
            case "up":
                positionNext.intY--;
                break;
            
            case "down":
                positionNext.intY++;
                break;
            
            case "left":
                positionNext.intX--;
                break;
            
            case "right":
                positionNext.intX++;
                break;
        }

        if (!Maps.isSizeInRange(positionNext)) return null;

        snake.positionNext = positionNext;
        return positionNext;
    }

    private static clearSnake(snake: Snake): void {
        SnakeGame.clearSnakeByArray(snake.dead());

        SnakeGame.mapAliveSnakes.delete(snake.getId());
    }
    private static clearSnakeByArray(array: Array<Position>): void {
        array.forEach(position => {
            Maps.getBlock(position).clearBlockObject();
        })
    }

    private static selectSort(arrSnakes: Array<Snake>): Array<Snake> {
        let arrSnakesSorted: Array<Snake> = [];

        for (let intTime = arrSnakes.length; intTime > 0; intTime--){
            let intMinIndex = SnakeGame.min(arrSnakes);

            arrSnakesSorted.push(arrSnakes.splice(intMinIndex, 1)[0]);
        }

        return arrSnakesSorted;
    }
    private static min(arrSnakes: Array<Snake>): number {
        let intMinIndex: number = 0;

        arrSnakes.forEach((snake, index) => {
            if (arrSnakes[intMinIndex].positionNext.compareTo(snake.positionNext) === "more than") intMinIndex = index;
        })

        return intMinIndex;
    }

    private static collideObject(arrSnakes: Array<Snake>): void {
        let setAliveSnakes: Set<Snake> = new Set(arrSnakes);

        for (let index = 0; index < (arrSnakes.length - 1); index++){
            if (SnakeGame.isCollidedHeadOfSnake(arrSnakes[index], arrSnakes[index + 1])){
                SnakeGame.collideHeadOfSnake(arrSnakes[index], arrSnakes[index + 1]).forEach(snake => {
                    setAliveSnakes.delete(snake);
                });
            }
        }
        SnakeGame.getDifferenceSet(arrSnakes, setAliveSnakes).forEach(snake => SnakeGame.clearSnake(snake));

        setAliveSnakes.forEach(snake => SnakeGame.goAheadSnake(snake))
    }
    private static isCollidedHeadOfSnake(snake01: Snake, snake02: Snake): boolean {
        return snake01.positionNext.isEqual(snake02.positionNext);
    }
    private static collideHeadOfSnake(snake01: Snake, snake02: Snake): Array<Snake> {
        if (snake01.getLength() === snake02.getLength()){
            return [snake01, snake02];
        }
        else if (snake01.getLength() > snake02.getLength()) return [snake02];
        else return [snake01];
    }
    private static getDifferenceSet(array: Array<any>, set: Set<any>): Array<any> {
        let arrDifferenceSet: Array<any> = array.filter((element)=>{
            return !set.has(element)
        })
        return arrDifferenceSet;
    }
    private static goAheadSnake(snake: Snake): void {
        let positionNext: Position = snake.positionNext;
        let blockObject: BlockObject = Maps.getBlock(positionNext.intX, positionNext.intY).getBlockObject();

        if (blockObject.isSnake()) SnakeGame.clearSnakeByArray( (blockObject as Snake).collided(positionNext) )
        else if (blockObject.isCandy()) {
            snake.eatCandy();

            SnakeGame.clearCandy(blockObject as Candy);
        }

        let positionSnakeTail = snake.getPositionTail();
        Maps.getBlock(positionNext.intX, positionNext.intY).setBlockObject(snake);
        if (!snake.isAteCandy()) Maps.getBlock(positionSnakeTail.intX, positionSnakeTail.intY).clearBlockObject();

        snake.goAhead();
    }
}