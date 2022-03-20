import BlockObject from './interface/BlockObject';

import OddNumber from './variableType/OddNumber';
import LogicalError from './error/LogicalError';

import abstractComparable from "./interface/abstractComparable";


export class Position extends abstractComparable{
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
        let intHeightDigit = (Maps.getHeight() + "").length;
        return (this.intX * Math.pow(10, intHeightDigit) ) + this.intY;
    }

    public clone(): Position {
        return new Position(this.intX, this.intY);
    }
}




class nullBlock implements BlockObject {
    public getColor(): string {
        return "#686868";
    }
    public isCandy(): boolean {
        return false;
    }
    public isSnake(): boolean {
        return false;
    }
    public toString(): string {
        return "null";
    }
}

export class Block {
    private static intSquareSizeByPx: number = 100;
    public blockObject: BlockObject = new nullBlock();
    public position: Position = new Position();


    constructor(intX: number, intY: number){
        this.position = new Position(intX, intY);
    }

    public static getSquareSizeByPx(): number {
        return Block.intSquareSizeByPx;
    }

    public static setSquareBlockSize(tagContainer: HTMLInputElement): void {
        let intBlockWidthByPx: number = parseInt(tagContainer.clientWidth / Maps.getWidth() * 0.8 + "");
        let intBlockHeightByPx: number = parseInt(tagContainer.clientHeight / Maps.getHeight() * 0.8 + "");

        Block.setSquareSizeByPx( (intBlockWidthByPx < intBlockHeightByPx) ? intBlockWidthByPx : intBlockHeightByPx );
    }

    private static setSquareSizeByPx(intNewSquareSizeByPx: number): void {
        Block.intSquareSizeByPx = intNewSquareSizeByPx;
    }

    public getColor(): string {
        return this.blockObject.getColor();
    }

    public clearBlockObject(){
        this.blockObject = new nullBlock();
    }
    public getBlockObject(): BlockObject{
        return this.blockObject;
    }
    public isNullBlockObject(): boolean {
        return this.getBlockObject() instanceof nullBlock;
    }
    public setBlockObject(blockObject: BlockObject): void {
        this.blockObject = blockObject;
    }
}




export class Maps {
    public static updateMainScreen: Function;

    private static oddNumberHeight: OddNumber = new OddNumber(9);
    private static oddNumberWidth: OddNumber = new OddNumber(9);
    public static arr2Blocks: Array<Array<Block>> = Maps.setBlocks(); // [intY][intX]


    public static clearMaps(){
        this.arr2Blocks = Maps.setBlocks();
    }

    public static getRandomPositionContainingNullBlock(): Position | null{
        let intRandomX: number = Maps.getRandomInt(Maps.getWidth());
        let intRandomY: number = Maps.getRandomInt(Maps.getHeight());

        let intTime: number = 100;
        let targetBlock = Maps.getBlock(intRandomX, intRandomY).getBlockObject();
        while ((intTime !== 0) && (targetBlock.isSnake()) || (targetBlock.isCandy())){
            intRandomX = Maps.getRandomInt(Maps.getWidth());
            intRandomY = Maps.getRandomInt(Maps.getHeight());

            targetBlock = Maps.getBlock(intRandomX, intRandomY).getBlockObject();

            intTime--;
        }

        if (intTime === 0){
            if (Maps.isFilled()) return null;
            return Maps.getSmallestPositionContainingNullBlock();
        }

        return new Position(intRandomX, intRandomY);
    }
    private static getRandomInt(intMax: number): number {
        return Math.floor(Math.random() * intMax);
    }
    private static getSmallestPositionContainingNullBlock(): Position{
        for (let intRowNumber = 0; intRowNumber < (Maps.oddNumberHeight as Number); intRowNumber++){
            for (let intColumnNumber = 0; intColumnNumber < (Maps.oddNumberWidth as Number); intColumnNumber++){
                if (Maps.getBlock(intColumnNumber, intRowNumber).isNullBlockObject()) return new Position(intColumnNumber, intRowNumber);
            }
        }
        throw new LogicalError("Maps- after checking by isFilled(), but the Maps hasn't nullBlock");
    }

    public static getBlock(position: Position): Block
    public static getBlock(intX: number, intY: number): Block
    public static getBlock(parameter01: any, parameter02?: number): Block {
        if (parameter02 === undefined) return Maps.arr2Blocks[parameter01.intY][parameter01.intX];
        else return Maps.arr2Blocks[parameter02][parameter01];
    }
    public static getBlocks(): Array<Array<Block>> {
        return Maps.arr2Blocks;
    }

    public static getColors(): Array<Array<string>> {
        let arr2Colors: Array<Array<string>> = [];

        for (let intY = 0; intY < Maps.getHeight(); intY++){
            let arrColors = [];

            for (let intX = 0; intX < Maps.getWidth(); intX++){
                arrColors.push(Maps.arr2Blocks[intY][intX].getColor());
            }
            arr2Colors.push(arrColors);
        }

        return arr2Colors;
    }

    public static getHeight(): number{
        return (Maps.oddNumberHeight as Number).valueOf();
    }
    public static getWidth(): number {
        return (Maps.oddNumberWidth as Number).valueOf();
    }

    public static isFilled(): boolean {
        for (let intRowNumber = 0; intRowNumber < (Maps.oddNumberHeight as Number); intRowNumber++){
            for (let intColumnNumber = 0; intColumnNumber < (Maps.oddNumberWidth as Number); intColumnNumber++){
                if (Maps.getBlock(intColumnNumber, intRowNumber).isNullBlockObject()) return false;
            }
        }
        return true;
    }

    public static isSizeInRange(position: Position): boolean {
        if ((position.intX < 0) || (position.intX >= Maps.getWidth())) return false;
        if ((position.intY < 0) || (position.intY >= Maps.getHeight())) return false;
        return true;
    }

    public static setBlocks(): Array<Array<Block>> {
        Maps.arr2Blocks = [];

        for (let intRowNumber = 0; intRowNumber < (Maps.oddNumberHeight as Number); intRowNumber++){
            let arrRowBlocks: Array<Block> = [];

            for (let intColumnNumber = 0; intColumnNumber < (Maps.oddNumberWidth as Number); intColumnNumber++){
                arrRowBlocks.push(new Block(intColumnNumber, intRowNumber));
            }

            Maps.arr2Blocks.push(arrRowBlocks);
        }

        return Maps.arr2Blocks;
    }

    public static setSize(intMaxHeight: number, intMaxWidth: number, tagContainer: HTMLInputElement): void {
        Maps.oddNumberHeight = new OddNumber(intMaxHeight);
        Maps.oddNumberWidth = new OddNumber(intMaxWidth);

        Maps.setBlocks();
        Block.setSquareBlockSize(tagContainer);
    }

    public static toString(): string{
        let strMaps: string = "";

        for (let intRowNumber = 0; intRowNumber < (Maps.oddNumberHeight as Number); intRowNumber++){
            for (let intColumnNumber = 0; intColumnNumber < (Maps.oddNumberWidth as Number); intColumnNumber++){
                strMaps += Maps.getBlock(intColumnNumber, intRowNumber).getBlockObject().toString() + "\t";
            }

            strMaps += "\n";
        }

        return strMaps;
    }
}