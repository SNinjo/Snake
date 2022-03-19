import Snake from "../Snake";

export default class OperationKeys{
    public static mapDefaultOperationKeys: Map<number, Array<string>> = new Map([
        [0, ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]],
        [1, ["w", "s", "a", "d"]],
    ]);

    private strUp: string = "ArrowUp";
    private strDown: string = "ArrowDown";
    private strLeft: string = "ArrowLeft";
    private strRight: string = "ArrowRight";


    constructor(snake: Snake, intDefaultOperationKeys: number)
    constructor(snake: Snake, strUp: string, strDown: string, strLeft: string, strRight: string)
    constructor(parameter01: any, parameter02: any, parameter03?: any, parameter04?: any, parameter05?: any){
        if (parameter05 === undefined){
            let arrStrKeys: Array<string> | undefined = OperationKeys.mapDefaultOperationKeys.get(parameter02);
            if (arrStrKeys !== undefined){
                this.strUp = arrStrKeys[0];
                this.strDown = arrStrKeys[1];
                this.strLeft = arrStrKeys[2];
                this.strRight = arrStrKeys[3];
            }
        }
        else {
            this.strUp = parameter02;
            this.strDown = parameter03;
            this.strLeft = parameter04;
            this.strRight = parameter05;
        }

        this.addKeyboardEventListener(parameter01);
    }

    private addKeyboardEventListener(snake: Snake): void {
        document.addEventListener("keydown", (event) => {
            switch (event.key){
                case this.strUp:
                    snake.setDirection("up");
                    break;
                
                case this.strDown:
                    snake.setDirection("down");
                    break;

                case this.strLeft:
                    snake.setDirection("left");
                    break;
                
                case this.strRight:
                    snake.setDirection("right");
                    break;
            }
        })
    }
}