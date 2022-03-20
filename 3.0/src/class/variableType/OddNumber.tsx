import LogicalError from '../error/LogicalError';


export default class OddNumber extends Number{
    constructor(intNumber: number){
        super(intNumber);
        
        if (!this.isOdd(intNumber)) throw new LogicalError("OddNumber- the number (" + intNumber + ") isn't odd number");
    }

    private isOdd(intNumber: number): boolean{
        if ((intNumber % 2) === 1) return true;
        else return false;
    }
}