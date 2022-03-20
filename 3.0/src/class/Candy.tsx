import BlockObject from "./interface/BlockObject";
import { Position } from "./Maps";


export default class Candy implements BlockObject {
    private static readonly strColor = "orange";
    private static intIdCounter: number = 0;

    private intId: number;
    private readonly positionGenerative: Position;


    constructor(intId: number, position: Position){
        this.intId = intId;
        this.positionGenerative = position;
    }

    public static getNextId(): number {
        return Candy.intIdCounter++;
    }

    public getColor(): string {
        return Candy.strColor;
    }
    public isCandy(): boolean {
        return true;
    }
    public isSnake(): boolean {
        return false;
    }
    public toString(): string {
        return "candy(" + this.intId + ")";
    }

    public getId(): number {
        return this.intId;
    }
    public getPositionGenerative(): Position {
        return this.positionGenerative;
    }
}