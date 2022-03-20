import abstractComparable from '../interface/abstractComparable';
import LogicalError from '../error/LogicalError';


class Node<T>{
    data: T;
    next: Node<T> | null = null;

    constructor(data: T){
        this.data = data;
    }
}

export default class LinkedList<T> {
    private intLength: number = 0;
    private head: Node<T> | null = null;


    constructor()
    constructor(tData: T)
    constructor(tData?: any){
        if (tData !== undefined){
            this.head = new Node(tData);
            this.intLength = 1;
        }
    }
    
    public addFromHead(tData: T): void {
        let newNode = new Node(tData);
        newNode.next = this.head;
        this.head = newNode;

        this.intLength++;
    }
    private checkIndex(intIndex: number, isStrict: boolean): void {
        if (intIndex < 0){
            throw new LogicalError("LinkedList- index can't less than 0");
        }
        else if (intIndex > this.intLength){
            throw new LogicalError("LinkedList- index can't more than length");
        }
        else if ((isStrict) && (intIndex >= this.intLength)){
            throw new LogicalError("LinkedList- index can't more than or equal to length");
        }
    }
    public getFromHead(): T {
        if (this.head === null) throw new LogicalError("LinkedList- can't get first data from empty linkedList");
        return this.head.data;
    }
    public getFromTail(): T {
        let nodeTail = this.getNode(this.intLength - 1);
        if (nodeTail === null) throw new LogicalError("LinkedList- can't get last data because its data is null");
        return nodeTail.data;
    }
    private getNode(intIndex: number): Node<T> | null {
        this.checkIndex(intIndex, true);

        let nodeCurrent = this.head;
        for (let i = 0; i < intIndex; i++){
            if (nodeCurrent === null) break;

            nodeCurrent = nodeCurrent.next;
        }
        return nodeCurrent;
    }
    public getLength(): number{
        return this.intLength;
    }
    public slice(intStartIndex: number): Array<T> {
        this.checkIndex(intStartIndex, true);

        let arrTSection: Array<T> = [];

        if (intStartIndex === 0) {
            arrTSection = this.toArray();
            this.head = null;
        }
        else {
            let nodeCurrent = this.getNode(intStartIndex - 1);
            if (nodeCurrent !== null) {
                arrTSection = this.toArray(nodeCurrent.next);
                nodeCurrent.next = null;
            }
        }

        this.intLength -= arrTSection.length;
        return arrTSection;
    }
    public indexOf(tData: any): number {
        let currentNode = this.head;
        let index = 0;
        while (currentNode != null){	
            if ((currentNode.data instanceof abstractComparable) && (tData instanceof abstractComparable)){
                if(tData.isEqual(currentNode.data)) return index;
            } 
            else {
                if(currentNode.data === tData) return index;
            }
            currentNode = currentNode.next;
            index++;
        }
        return -1;
    }
    public removeFromTail(): void {
        this.slice(this.intLength - 1);
    }
    public toArray(): Array<T>
    public toArray(nodeStart: Node<T> | null): Array<T>
    public toArray(nodeStart?: Node<T> | null): Array<T> {
        let nodeCurrent: Node<T> | null = nodeStart ?? this.head;
        let array: Array<T> = [];

        while (nodeCurrent != null){
            array.push(nodeCurrent.data);
            nodeCurrent = nodeCurrent.next;
        }
        return array;
    }
}