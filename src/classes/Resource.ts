import WorldObject from "./WorldObject";
import { ResourceType, Team } from "./enum.types";
import { Position, WorldObjectModel } from "../models/models";

export default class Resource extends WorldObject implements WorldObjectModel {
    private _quantity: number;
    private _type: ResourceType;

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number){
        this._quantity = value;
    }

    get type(): ResourceType {
        return this._type;
    }

    constructor(healthPoints: number, position: Position, type: ResourceType) {
        super(healthPoints, position, false, Team.NEUTRAL);
        this._quantity = this.healthPoints;
        this._type = type;
    }

    public getInformation(): string {
        const quantity = this._quantity;
        const type = this._type.toString();

        return `There are ${quantity} of ${type} left.`;
    }

    public override toString(): string{
        return `resource: ${this._type} quantity: ${this._quantity} position: x: ${super.position.x}, y: ${super.position.y}`;
    }
}