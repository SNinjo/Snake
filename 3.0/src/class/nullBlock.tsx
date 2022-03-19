import BlockObject from "./interface/BlockObject";

export default class nullBlock implements BlockObject {
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