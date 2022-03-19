import Timer from "./Timer";
import Candy from "./Candy";
import Snake from "./Snake";
import classMap from "./Map";
import User from "./User";
import OperationKeys from "./dataStructure/OperationKeys";
import Position from "./dataStructure/Position";
import LogicalError from "./LogicalError";
import BlockObject from "./interface/BlockObject";


export default class SnakeGame{
    public static changeToOverState: Function;
    public static changeToPassState: Function;

    private static mapCandys: Map<number, Candy> = new Map();
    private static mapSnakes: Map<number, Snake> = new Map();
    private static mapAliveSnakes: Map<number, Snake>;
    private static mapUser: Map<number, User> = new Map();
    private static intIdCounter: number = 0;


    public static executeEachFrame(): void {
        if (SnakeGame.mapAliveSnakes.size === 0) SnakeGame.over();
        if (classMap.isFilled()) SnakeGame.pass();
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

        classMap.updateMainScreen();
    }

    public static initialize(): void {
        SnakeGame.mapAliveSnakes = new Map(SnakeGame.mapSnakes);
        SnakeGame.mapAliveSnakes.forEach(snake => snake.initialize());
        SnakeGame.mapCandys.forEach(candy => SnakeGame.clearCandy(candy));

        classMap.clearMap();
        this.mapAliveSnakes.forEach(snake => {
            let positionGenerative = snake.getPositionGenerative();

            classMap.getBlock(positionGenerative.intX, positionGenerative.intY).setBlockObject(snake);
        })

        SnakeGame.generateCandy();

        classMap.updateMainScreen();
    }

    public static start(): void {
        Timer.start();
    }
    public static pause(): void {
        Timer.pause();
    }
    public static restart(): void {
        Timer.pause();
        SnakeGame.initialize();
        Timer.start();
    }
    public static exit(): void {
        SnakeGame.initialize();
        Timer.pause();
    }
    private static over(): void {
        Timer.pause();
        SnakeGame.changeToOverState();
    }
    static pass(): void {
        Timer.pause();
        SnakeGame.changeToPassState();
    }
    public static isPlaying(): boolean {
        return Timer.isExecuting();
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
        let positionGenerative = classMap.getRandomPositionContainingNullBlock();
        if (positionGenerative === null) return;
        let candy = new Candy(intId, positionGenerative);

        SnakeGame.mapCandys.set(intId, new Candy(intId, positionGenerative));

        classMap.getBlock(positionGenerative).setBlockObject(candy);
    }
    private static clearCandy(candy: Candy): void {
        classMap.getBlock(candy.getPositionGenerative()).clearBlockObject();
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

        if (!classMap.isSizeInRange(positionNext)) return null;

        snake.positionNext = positionNext;
        return positionNext;
    }

    private static clearSnake(snake: Snake): void {
        SnakeGame.clearSnakeByArray(snake.dead());

        SnakeGame.mapAliveSnakes.delete(snake.getId());
    }
    private static clearSnakeByArray(array: Array<Position>): void {
        array.forEach(position => {
            classMap.getBlock(position).clearBlockObject();
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
            if (arrSnakes[intMinIndex].positionNext?.compareTo(snake.positionNext) === "more than") intMinIndex = index;
        })

        return intMinIndex;
    }

    private static collideObject(arrSnakes: Array<Snake>): void {
        let setAliveSnakes: Set<Snake> = new Set(arrSnakes);

        for (let index = 0; index < (arrSnakes.length - 1); index++){
            if (SnakeGame.isCollidedForHead(arrSnakes[index], arrSnakes[index + 1])){
                setAliveSnakes.delete(arrSnakes[index]);
                setAliveSnakes.delete(arrSnakes[index + 1]);
            }
        }
        SnakeGame.getDifferenceSet(arrSnakes, setAliveSnakes).forEach(snake => SnakeGame.clearSnake(snake));

        setAliveSnakes.forEach(snake => SnakeGame.goAheadSnake(snake))
    }
    private static isCollidedForHead(snake01: Snake, snake02: Snake): boolean {
        if (snake01.positionNext === undefined) throw new LogicalError("SnakeGame- the positionNext of snake is undefined, so can't execute isCollidedForHead()");
        return snake01.positionNext.isEqual(snake02.positionNext);
    }
    private static getDifferenceSet(array: Array<any>, set: Set<any>): Array<any> {
        let arrDifferenceSet: Array<any> = array.filter((element)=>{
            return !set.has(element)
        })
        return arrDifferenceSet;
    }
    private static goAheadSnake(snake: Snake): void {
        if (snake.positionNext === undefined) throw new LogicalError("SnakeGame- the positionNext of snake is undefined, so can't execute goAheadSnake()");

        let positionNext: Position = snake.positionNext;
        let blockObject: BlockObject = classMap.getBlock(positionNext.intX, positionNext.intY).getBlockObject();

        if (blockObject.isSnake()) SnakeGame.clearSnakeByArray( (blockObject as Snake).collided(positionNext) )
        else if (blockObject.isCandy()) {
            snake.eatCandy();

            SnakeGame.clearCandy(blockObject as Candy);
        }

        let positionSnakeTail = snake.getPositionTail();
        classMap.getBlock(positionNext.intX, positionNext.intY).setBlockObject(snake);
        if (!snake.isAteCandy()) classMap.getBlock(positionSnakeTail.intX, positionSnakeTail.intY).clearBlockObject();

        snake.goAhead();
    }
}