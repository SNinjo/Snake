import OperationKeys from "./dataStructure/OperationKeys";

export default class User{
    private intId: number;
    private operationKeys: OperationKeys;


    constructor(intId: number, operationKeys: OperationKeys){
        this.intId = intId;
        this.operationKeys = operationKeys;
    }
}