import Comparable from "./Comparable";

export default abstract class abstractComparable implements Comparable {
    abstract isEqual(target: any): boolean;
    abstract compareTo(target: any): string;
}