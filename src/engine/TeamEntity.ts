import Resource from "src/classes/Resource";
import Unit from "src/classes/Unit";
import { Team, UnitType } from "src/classes/enum.types";
import { Position } from "src/classes/models";
import ResourceStorage from "src/classes/ResourceStorage";

export default class TeamEntity{
    private _units: Unit[];
    private _resourceStorage: ResourceStorage;
    private _type: Team;

    constructor(team: Team){
        this._units = [];
        this._resourceStorage = new ResourceStorage();
        this._type = team;
    }

    get type(): Team{
        return this._type;
    }

    get resourceStorage(): ResourceStorage{
        return this._resourceStorage;
    }

    public createUnit(name: string, position: Position, team: Team, unitType: UnitType): void{
        this._units.push(new Unit(position, team, name, unitType));
    }

    public checkIfNameIsUnique(name: string): boolean{
        const unit: (Unit | undefined) = this._units.find(unit => unit.name === name);
        return unit ? false : true;
    }

    public getUnitByName(name: string): (Unit | undefined){
        return this._units.find(unit => unit.name === name);       
    }

    public getUnitsByPosition(position: Position): Unit[]{
        return this._units.filter(unit => unit.position.x === position.x && unit.position.y === position.y);
    }

    public deleteUnit(unit: Unit): void{
        for(let i = 0; i < this._units.length; i++){
            if(unit === this._units[i]){
                this._units.splice(i, 1);
                return;
            }
        }
    }

    private getUnitPoints(): number{
        let points = 0;
        
        this._units.forEach(u => {
            switch(u.type){
                case UnitType.GIANT:
                    points += 15;
                    break;
                case UnitType.GUARD:
                    points += 10;
                    break;
                case UnitType.NINJA:
                    points += 15;
                    break;
                case UnitType.PEASANT:
                    points += 5;
                    break;
            }
        });
        return points;
    }

    public getPoints(): number{
        return this.getUnitPoints() + this._resourceStorage.getStoragePoints();
    }
}