import LogicalError from "../LogicalError";


export default class Direction {
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