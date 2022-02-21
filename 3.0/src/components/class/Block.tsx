import Map from './Map';
import BlockObject from './BlockObject';
import Position from './Position';

export default class Block {
    private static intSquareSizeByPx: number = 100;
    public static readonly strBackgroundColor: string = "#727272";
    public blockObject: BlockObject = new BlockObject();
    public strColor: string = Block.strBackgroundColor;
    public position: Position = new Position();


    constructor(intX: number, intY: number){
        this.position = new Position(intX, intY);
    }
    

    public static getSquareSizeByPx(): number{
        return Block.intSquareSizeByPx;
    }

    public static setSquareBlockSize(tagContainer: HTMLInputElement): void{
        let intBlockWidthByPx: number = parseInt(tagContainer.clientWidth / Map.getWidth() * 0.8 + "");
        let intBlockHeightByPx: number = parseInt(tagContainer.clientHeight / Map.getHeight() * 0.8 + "");

        Block.setSquareSizeByPx( (intBlockWidthByPx < intBlockHeightByPx) ? intBlockWidthByPx : intBlockHeightByPx );
    }

    private static setSquareSizeByPx(intNewSquareSizeByPx: number): void{
        Block.intSquareSizeByPx = intNewSquareSizeByPx;
    };
}