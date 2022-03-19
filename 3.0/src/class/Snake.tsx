import BlockObject from "./interface/BlockObject";
import LinkedList from "./dataStructure/LinkedList";
import Direction from "./dataStructure/Direction";
import Position from "./dataStructure/Position";
import LogicalError from "./LogicalError";


export default class Snake implements BlockObject{
    private intId: number;
    private booAteCandy: boolean = false;
    private readonly strInitialDirection: string;
    private direction: Direction;
    private linPositionBodys: LinkedList<Position>;
    private readonly positionGenerative: Position;
    public positionNext?: Position;
    private strColor: "red" | "yellow" | "blue" | "purple";


    constructor(intId: number, positionGenerative: Position, strDirection: string, strColor: "red" | "yellow" | "blue" | "purple"){
        this.intId = intId;
        this.direction = new Direction(strDirection);
        this.strInitialDirection = strDirection;
        this.linPositionBodys = new LinkedList(positionGenerative.clone());
        this.positionGenerative = positionGenerative;
        /* With ES6 imports, the module evaluation order is arbitrary if there's a cycle in the import graph. This can also cause problems with other bundlers too. */
        // this.positionNext = new Position(); // Cannot access 'Position' before initialization
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

        if (this.positionNext === undefined) throw new LogicalError("Snake- the positionNext of snake is undefined, so can't execute goAhead()");
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