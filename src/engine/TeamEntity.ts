import Resource from "src/classes/Resource";
import Unit from "src/classes/Unit";
import { Team, UnitType } from "src/classes/enum.types";
import { Position } from "src/classes/models";

export default class TeamEntity{
    private _units: Unit[];
    private _resources: Resource[];
    private _type: Team;

    constructor(team: Team){
        this._units = [];
        this._resources = [];
        this._type = team;
    }

    public createUnit(name: string, position: Position, team: Team, unitType: UnitType): void{
        this._units.push(new Unit(position, team, name, unitType));
    }

    public checkIfNameIsUnique(name: string): boolean{
        const unit: (Unit | undefined) = this._units.find(unit => unit.name === name);
        console.log(unit);
        return unit ? false : true;
    }
}