export default class Position{
    public intX: number;
    public intY: number;

    constructor();
    constructor(intX: number, intY: number);
    constructor(intX?: any, intY?: any){
        this.intX = intX ?? 0;
        this.intY = intY ?? 0;
    }
}