import Block from './Block';
import OddNumber from './OddNumber';
import Position from './dataStructure/Position';
import LogicalError from './LogicalError';


export default class Map {
    public static updateMainScreen: Function;

    private static oddNumberHeight: OddNumber = new OddNumber(9);
    private static oddNumberWidth: OddNumber = new OddNumber(9);
    public static arr2Blocks: Array<Array<Block>> = Map.setBlocks(); // [intY][intX]


    public static clearMap(){
        this.arr2Blocks = Map.setBlocks();
    }

    public static getRandomPositionContainingNullBlock(): Position | null{
        let intRandomX: number = Map.getRandomInt(Map.getWidth());
        let intRandomY: number = Map.getRandomInt(Map.getHeight());

        let intTime: number = 100;
        let targetBlock = Map.getBlock(intRandomX, intRandomY).getBlockObject();
        while ((intTime !== 0) && (targetBlock.isSnake()) || (targetBlock.isCandy())){
            intRandomX = Map.getRandomInt(Map.getWidth());
            intRandomY = Map.getRandomInt(Map.getHeight());

            targetBlock = Map.getBlock(intRandomX, intRandomY).getBlockObject();

            intTime--;
        }

        if (intTime === 0){
            if (Map.isFilled()) return null;
            return Map.getSmallestPositionContainingNullBlock();
        }

        return new Position(intRandomX, intRandomY);
    }
    private static getRandomInt(intMax: number): number {
        return Math.floor(Math.random() * intMax);
    }
    private static getSmallestPositionContainingNullBlock(): Position{
        for (let intRowNumber = 0; intRowNumber < (Map.oddNumberHeight as Number); intRowNumber++){
            for (let intColumnNumber = 0; intColumnNumber < (Map.oddNumberWidth as Number); intColumnNumber++){
                if (Map.getBlock(intColumnNumber, intRowNumber).isNullBlockObject()) return new Position(intColumnNumber, intRowNumber);
            }
        }
        throw new LogicalError("Map- after checking by isFilled(), but the map hasn't nullBlock");
    }

    public static getBlock(position: Position): Block
    public static getBlock(intX: number, intY: number): Block
    public static getBlock(parameter01: any, parameter02?: number): Block {
        if (parameter02 === undefined) return Map.arr2Blocks[parameter01.intY][parameter01.intX];
        else return Map.arr2Blocks[parameter02][parameter01];
    }
    public static getBlocks(): Array<Array<Block>> {
        return Map.arr2Blocks;
    }

    public static getColors(): Array<Array<string>> {
        let arr2Colors: Array<Array<string>> = [];

        for (let intY = 0; intY < Map.getHeight(); intY++){
            let arrColors = [];

            for (let intX = 0; intX < Map.getWidth(); intX++){
                arrColors.push(Map.arr2Blocks[intY][intX].getColor());
            }
            arr2Colors.push(arrColors);
        }

        return arr2Colors;
    }

    public static getHeight(): number{
        return (Map.oddNumberHeight as Number).valueOf();
    }
    public static getWidth(): number {
        return (Map.oddNumberWidth as Number).valueOf();
    }

    public static isFilled(): boolean {
        for (let intRowNumber = 0; intRowNumber < (Map.oddNumberHeight as Number); intRowNumber++){
            for (let intColumnNumber = 0; intColumnNumber < (Map.oddNumberWidth as Number); intColumnNumber++){
                if (Map.getBlock(intColumnNumber, intRowNumber).isNullBlockObject()) return false;
            }
        }
        return true;
    }

    public static isSizeInRange(position: Position): boolean {
        if ((position.intX < 0) || (position.intX >= Map.getWidth())) return false;
        if ((position.intY < 0) || (position.intY >= Map.getHeight())) return false;
        return true;
    }

    public static setBlocks(): Array<Array<Block>> {
        Map.arr2Blocks = [];

        for (let intRowNumber = 0; intRowNumber < (Map.oddNumberHeight as Number); intRowNumber++){
            let arrRowBlocks: Array<Block> = [];

            for (let intColumnNumber = 0; intColumnNumber < (Map.oddNumberWidth as Number); intColumnNumber++){
                arrRowBlocks.push(new Block(intColumnNumber, intRowNumber));
            }

            Map.arr2Blocks.push(arrRowBlocks);
        }

        return Map.arr2Blocks;
    }

    public static setSize(intMaxHeight: number, intMaxWidth: number, tagContainer: HTMLInputElement): void {
        Map.oddNumberHeight = new OddNumber(intMaxHeight);
        Map.oddNumberWidth = new OddNumber(intMaxWidth);

        Map.setBlocks();
        Block.setSquareBlockSize(tagContainer);
    }

    public static toString(): string{
        let strMap: string = "";

        for (let intRowNumber = 0; intRowNumber < (Map.oddNumberHeight as Number); intRowNumber++){
            for (let intColumnNumber = 0; intColumnNumber < (Map.oddNumberWidth as Number); intColumnNumber++){
                strMap += Map.getBlock(intColumnNumber, intRowNumber).getBlockObject().toString() + "\t";
            }

            strMap += "\n";
        }

        return strMap;
    }
}