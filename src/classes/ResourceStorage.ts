import { ResourceStorageModel } from "src/models/models";
import { ResourceType } from "./enum.types";
import Resource from "./Resource";

export default class ResourceStorage implements ResourceStorageModel {
    private _lumberStored: Resource;
    private _foodStored: Resource;
    private _ironStored: Resource;

    get lumberStored(): Resource{
        return this._lumberStored;
    }
    get foodStored(): Resource{
        return this._foodStored;
    }
    get ironStored(): Resource{
        return this._ironStored;
    }

    constructor(){
        this._foodStored = new Resource(0, {x:0, y:0}, ResourceType.FOOD);
        this._lumberStored = new Resource(0, {x:0, y:1}, ResourceType.LUMBER);
        this._ironStored = new Resource(0, {x:1, y:1}, ResourceType.IRON);
    }

    public addResource(resource: Resource): void{
        switch(resource.type){
            case ResourceType.FOOD:
                this._foodStored.quantity = resource.quantity;
                break;
            case ResourceType.LUMBER:
                this._lumberStored.quantity = resource.quantity;
                break;
            case ResourceType.IRON:
                this._ironStored.quantity = resource.quantity;
                break;
            default:
                break;
        }
    }

    public getResourcesInformation(): string{
        return `${this._foodStored.quantity} food, ${this._lumberStored.quantity} lumber and ${this._ironStored.quantity} iron`;
    }

    public getStoragePoints(): number{
        return (this._foodStored.quantity + this._ironStored.quantity + this._lumberStored.quantity) * 10;
    }
}