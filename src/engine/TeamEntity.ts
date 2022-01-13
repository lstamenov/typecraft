import Resource from "src/classes/Resource";
import Unit from "src/classes/Unit";
import { Team, UnitType } from "src/classes/enum.types";
import { Position } from "src/classes/models";

export default class TeamEntity {
    private _units: Unit[];
    private _resources: Resource[];
    private _type: Team;

    constructor(team: Team) {
        this._units = [];
        this._resources = [];
        this._type = team;
    }

    public get units() {
        return this._units;
    }

    public createUnit(name: string, position: Position, team: Team, unitType: UnitType): void {
        this._units.push(new Unit(position, team, name, unitType));
    }

    public checkIfNameIsUnique(name: string): boolean {
        const unit: (Unit | undefined) = this._units.find(unit => unit.name === name);
        return unit ? false : true;
    }

    public getUnitByName(name: string): (Unit | undefined) {
        return this._units.find(unit => unit.name === name);
    }

    public getUnitsByPosition(position: Position): Unit[] {
        return this._units.filter(unit => unit.position.x === position.x && unit.position.y === position.y);
    }

    public deleteUnit(unit: Unit): void {
        for (let i = 0; i < this._units.length; i++) {
            if (unit === this._units[i]) {
                this._units.splice(i, 1);
                return;
            }
        }
    }

    public getInformationForAllUnits(): string {
        const count = this._units.length;
        const colorTeam = this._type;

        let message: string;
        message = (`There are ${count} unit/s left from ${colorTeam} team.\n`);


        this._units.forEach(unit => message += unit.getInformation());
        return message;
    }

    public getIformationForAllResources(): string {
        const count = this._resources.length;

        return `There are ${count} resources left.`;
    }
}