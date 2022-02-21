import OddNumber from './OddNumber';
import Block from './Block';


export default class Map {
    private static arr2Blocks: Array<Array<Block>>;
    private static intMaxOddHeight: number = new OddNumber(7).valueOf();
    private static intMaxOddWidth: number = new OddNumber(7).valueOf();


    public static getBlock(intX: number, intY: number): Block{
        return Map.arr2Blocks[intY][intX];
    }
    public static getBlocks(): Array<Array<Block>>{
        return Map.arr2Blocks;
    }

    public static getHeight(): number{
        return Map.intMaxOddHeight;
    }

    public static getMapByString(): string{/*                           not completed*/
        return '';
    }

    public static getWidth(): number{
        return Map.intMaxOddWidth;
    }

    private static setBlocks(): void{
        Map.arr2Blocks = [];

        for (let intRowNumber = 0; intRowNumber < Map.intMaxOddHeight; intRowNumber++){
            let arrRowBlocks: Array<Block> = [];

            for (let intColumnNumber = 0; intColumnNumber < Map.intMaxOddWidth; intColumnNumber++){
                arrRowBlocks.push(new Block(intColumnNumber, intRowNumber));
            }

            Map.arr2Blocks.push(arrRowBlocks);
        }
    }

    public static setSize(intMaxOddHeight: number, intMaxOddWidth: number, tagContainer: HTMLInputElement): void{
        Map.intMaxOddHeight = new OddNumber(intMaxOddHeight).valueOf();
        Map.intMaxOddWidth = new OddNumber(intMaxOddWidth).valueOf();

        Map.setBlocks();
        Block.setSquareBlockSize(tagContainer);
    }

    public static updateBlocksColor(): void{/*                           not completed*/

    }
}