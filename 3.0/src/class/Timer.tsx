import SnakeGame from "./SnakeGame";

export default class Timer {
    private static intFrameSpeedEachSecond: number = 0.5;
    private static timeoutId: NodeJS.Timer | null = null;

    public static start(): void {
        Timer.timeoutId = setInterval(SnakeGame.executeEachFrame, (Timer.intFrameSpeedEachSecond * 1000));
    }
    public static pause(): void {
        if (Timer.timeoutId !== null) clearInterval(Timer.timeoutId);
        Timer.timeoutId = null;
    }

    public static isExecuting(): boolean {
        return Timer.timeoutId !== null;
    }
}