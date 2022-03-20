import BlockObject from "./interface/BlockObject";
import LinkedList from "./dataStructure/LinkedList";
import { Position } from "./Maps";

import LogicalError from "./error/LogicalError";


class Direction {
    private static readonly mapNumberToString: Map<number, string> = new Map([
        [0, "null"],
        [0, "up"],
        [1, "right"],
        [2, "down"],
        [3, "left"],
    ])
    private static readonly mapStringToNumber: Map<string, number> = new Map([
        ["null", 0],
        ["up", 0],
        ["right", 1],
        ["down", 2],
        ["left", 3],
    ])

    private intDirection: number = 0;
    private intLastDirection: number = -1;


    constructor(strDirection: string){
        this.intDirection = this.valueOf(strDirection);
    }

    private valueOf(strDirection: string): number {
        let intDirection = Direction.mapStringToNumber.get(strDirection);
        if (intDirection === undefined) throw new LogicalError("Direction- this direction is't exist (strDirection: " + strDirection + ")");
        return intDirection;
    }
    private toString(intDirection: number): string {
        let strDirection = Direction.mapNumberToString.get(intDirection);
        if (strDirection === undefined) throw new LogicalError("Direction- this direction number is't exist (intDirection: " + intDirection + ")");
        return strDirection;
    }

    public getDirection(): string {
        return this.toString(this.intDirection);
    }

    public setDirection(strNewDirection: string): void {
        let intNewDirection = this.valueOf(strNewDirection);
        if (this.isOppositeDirection(intNewDirection, this.intLastDirection)) return;

        this.intDirection = intNewDirection;
    }
    public updateLastDirection(): void {
        this.intLastDirection = this.intDirection;
    }
    private isOppositeDirection(intDirection01: number, intDirection02: number): boolean {
        return ((intDirection01 + 2) % 4) === intDirection02;
    }
}




export default class Snake implements BlockObject{
    private intId: number;
    private booAteCandy: boolean = false;
    private readonly strInitialDirection: string;
    private direction: Direction;
    private linPositionBodys: LinkedList<Position>;
    private readonly positionGenerative: Position;
    public positionNext: Position;
    private strColor: "red" | "yellow" | "blue" | "purple";


    constructor(intId: number, positionGenerative: Position, strDirection: string, strColor: "red" | "yellow" | "blue" | "purple"){
        this.intId = intId;
        this.direction = new Direction(strDirection);
        this.strInitialDirection = strDirection;
        this.linPositionBodys = new LinkedList(positionGenerative.clone());
        this.positionGenerative = positionGenerative;
        this.positionNext = new Position();
        this.strColor = strColor;
    }

    public getColor(): string {
        return this.strColor;
    }
    public isCandy(): boolean {
        return false;
    }
    public isSnake(): boolean {
        return true;
    }

    public dead(): Array<Position> {
        return this.linPositionBodys.toArray();
    }
    public collided(positionCollision: Position): Array<Position> {
        return this.linPositionBodys.slice(this.linPositionBodys.indexOf(positionCollision));
    }

    public digestCandy(): void {
        this.booAteCandy = false;
    }
    public eatCandy(){
        this.booAteCandy = true;
    }
    public isAteCandy(): boolean {
        return this.booAteCandy;
    }

    public getDirection(): string {
        return this.direction.getDirection();
    }
    public setDirection(strDirection: string): void {
        this.direction.setDirection(strDirection);
    }

    public getId(): number {
        return this.intId;
    }
    public getLength(): number {
        return this.linPositionBodys.getLength();
    }
    public getPositionGenerative(): Position {
        return this.positionGenerative;
    }
    public getPositionHead(): Position {
        return this.linPositionBodys.getFromHead();
    }
    public getPositionTail(): Position {
        return this.linPositionBodys.getFromTail();
    }

    public goAhead(): void {
        this.direction.updateLastDirection();

        this.linPositionBodys.addFromHead(this.positionNext);

        if (this.isAteCandy()) this.digestCandy();
        else this.linPositionBodys.removeFromTail();
    }

    public initialize(): void {
        this.direction = new Direction(this.strInitialDirection);
        this.linPositionBodys = new LinkedList(this.positionGenerative.clone());
    }

    public toString(): string {
        return "snake(" + this.intId + ", " + this.strColor + ")";
    }
}