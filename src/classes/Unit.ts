import { ResourceType, Team, UnitType } from "./enum.types";
import { Position } from "./models";
import Resource from "./Resource";
import WorldObject from "./WorldObject";
 
export default class Unit extends WorldObject {
    private _name: string;
    private _attack: number;
    private _defense: number;
    private _canGather: boolean;
    private _type: UnitType;
 
    constructor(position: Position,
        team: Team,
        name: string,
        type: UnitType) {
        super(0, position, true, team);
        this._name = name;
        this._type = type;
        this.setStats();
    }
 
    private setStats(): void {
        switch (this._type) {
            case UnitType.PEASANT:
                this._attack = 25;
                this._defense = 10;
                this._canGather = true;
                this.modifyHealthPoints(50);
                break;
            case UnitType.GUARD:
                this._attack = 30;
                this._defense = 20;
                this._canGather = false;
                this.modifyHealthPoints(80);
                break;
            case UnitType.NINJA:
                this._attack = 50;
                this._defense = 10;
                this._canGather = false;
                this.modifyHealthPoints(80);
                break;
            case UnitType.GIANT:
                this._attack = 40;
                this._defense = 20;
                this._canGather = true;
                this.modifyHealthPoints(90);
                break;
            default:
                break;
        }
    }
    get name(): string {
        return this._name;
    }
 
    get attack(): number {
        return this._attack;
    }
 
    get defense(): number {
        return this._defense;
    }
 
    get canGather(): boolean {
        return this._canGather;
    }
 
 
    attackEnemy(enemy: Unit): void {
 
 
        const attackPoints = this._attack;
        enemy.modifyHealthPoints(attackPoints);
        const defensePoints = this._defense;
        this.modifyHealthPoints(defensePoints);
 
    }
 
    move(enemyPosition: Position): void {
        super.modifyPosition(enemyPosition);
    }
 
    gatherResource(resource: Resource) {
        const unitType = this._type;
 
 
        switch (unitType) {
            case 'PEASANT':
                break;
            case 'GIANT':
                if (resource.type !== ResourceType.LUMBER) {
                    throw new Error('You cannot gather that');
                }
                break;
            default:
                throw new Error('You cannot gather that');
        }
 
 
    }
 
}