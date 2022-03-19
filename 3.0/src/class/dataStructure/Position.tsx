import abstractComparable from "../interface/abstractComparable";
import Map from "../Map";


export default class Position extends abstractComparable{
    public intX: number;
    public intY: number;

    
    constructor();
    constructor(intX: number, intY: number);
    constructor(intX?: any, intY?: any){
        super();

        this.intX = intX ?? -1;
        this.intY = intY ?? -1;
    }

    public isEqual(target: any): boolean {
        return (this.intX === target.intX) && (this.intY === target.intY);
    }

    public compareTo(target: any): string {
        if (this.isEqual(target)) return "equal";
        if (this.getComparableNumber() > target.getComparableNumber()) return "more than";
        else return "less than"
    }
    private getComparableNumber(): number {
        let intHeightDigit = (Map.getHeight() + "").length;
        return (this.intX * Math.pow(10, intHeightDigit) ) + this.intY;
    }

    public clone(): Position {
        return new Position(this.intX, this.intY);
    }
}