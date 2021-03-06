import Unit from "src/classes/Unit";
import { Team, UnitType } from "src/classes/enum.types";
import { Position } from "src/models/models";
import ResourceStorage from "src/classes/ResourceStorage";

export default class TeamEntity {
    private _units: Unit[];
    private _resourceStorage: ResourceStorage;
    private _type: Team;

    public get units() {
        return this._units;
    }

    get type(): Team{
        return this._type;
    }

    get resourceStorage(): ResourceStorage{
        return this._resourceStorage;
    }

    constructor(team: Team) {
        this._units = [];
        this._resourceStorage = new ResourceStorage();
        this._type = team;
    }

    public createUnit(name: string, position: Position, team: Team, unitType: UnitType): void{
        this._units.push(new Unit(position, team, name, unitType));
    }

    public checkIfNameIsUnique(name: string): boolean {
        const unit: (Unit | undefined) = this._units.find(unit => unit.name === name);
        return !!!unit;
    }

    public getUnitByName(name: string): (Unit | undefined) {
        return this._units.find(unit => unit.name === name);
    }

    public getUnitsByPosition(position: Position): Unit[] {
        return this._units.filter(unit => unit.position.x === position.x && unit.position.y === position.y);
    }

    public deleteUnit(unit: Unit): void {
        let unitIndexToDelete = -1;

        for (let i = 0; i < this._units.length; i++) {
            if (unit === this._units[i]) {
                unitIndexToDelete = i;
            }
        }

        if(unitIndexToDelete !== -1){
            this._units.splice(unitIndexToDelete, 1);
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

    public getInformationForAllUnits(): string {
        const count = this._units.length;
        const colorTeam = this._type;

        let message: string;
        message = (`There are ${count} unit/s left from ${colorTeam} team.\n`);


        this._units.forEach(unit => message += unit.getInformation());
        return message;
    }

    public getIformationForAllResources(): string {
        const count = this._resourceStorage;

        return `There are ${count} resources left.`;
    }
}