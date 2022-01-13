import WorldObject from "./WorldObject";
import { ResourceType, Team } from "./enum.types";
import { Position } from "./models";

export default class Resource extends WorldObject {
    private _quantity: number;
    private _type: ResourceType;

    constructor(healthPoints: number, position: Position, type: ResourceType) {
        super(healthPoints, position, false, Team.NEUTRAL);
        this._quantity = this.healthPoints;
        this._type = type;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number){
        this._quantity = value;
    }

    get type(): ResourceType {
        return this._type;
    }

    public getInformation(): string {
        const quantity = this._quantity;
        const type = this._type.toString();

        return `There are ${quantity} of ${type} left.`;
    }
}