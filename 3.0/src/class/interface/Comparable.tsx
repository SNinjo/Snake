export default interface Comparable {
    isEqual(target: any): boolean;
    compareTo(target: any): string;
}