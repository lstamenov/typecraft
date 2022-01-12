import WorldObject from "./WorldObject";
import { ResourceType, Team } from "./enum.types";
import { Position } from "./models";

export default class Resource extends WorldObject{
    private _quantity: number;
    private _type: ResourceType;

    constructor(healthPoints: number, position: Position, type: ResourceType){
        super(healthPoints, position, false, Team.NEUTRAL);
        this._quantity = this.healthPoints;
        this._type = type;
    }

    get quantity(): number{
        return this._quantity;
    }

    get type(): ResourceType{
        return this._type;
    }
}