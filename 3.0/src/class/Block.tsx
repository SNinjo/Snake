import Map from './Map';
import BlockObject from './interface/BlockObject';
import Position from './dataStructure/Position';
import nullBlock from './nullBlock';


export default class Block {
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
        let intBlockWidthByPx: number = parseInt(tagContainer.clientWidth / Map.getWidth() * 0.8 + "");
        let intBlockHeightByPx: number = parseInt(tagContainer.clientHeight / Map.getHeight() * 0.8 + "");

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