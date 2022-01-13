import TeamEntity from "src/engine/TeamEntity";
import { ResourceType, Team, UnitType } from "src/classes/enum.types";
import { Position } from "src/classes/models";
import Resource from "src/classes/Resource";
import Unit from "src/classes/Unit";

export class UnitUtils {
    public validateUnitName(name: string, redTeam: TeamEntity, blueTeam: TeamEntity): void{
        if(!(blueTeam.checkIfNameIsUnique(name) && redTeam.checkIfNameIsUnique(name))){
            throw new Error('Unit with this name already exists!');
        }
        if(name.length > 20){
            throw new Error('Unit name too long!');
        }
    }

    public getUnitTeamByString(teamAsString: string): Team{
        if(teamAsString.toUpperCase() === Team.BLUE){
            return Team.BLUE;
        }
        if(teamAsString.toUpperCase() === Team.RED){
            return Team.RED;
        }
        throw new Error(`Team ${teamAsString} does not exist!`);
    }

    public getUnitTypeByString(typeAsString: string): UnitType{
        if(typeAsString === 'PEASANT' || typeAsString === 'GUARD'
        || typeAsString === 'GIANT' || typeAsString === 'NINJA'){
             const unitType: keyof typeof UnitType = typeAsString;
             return UnitType[unitType];
        }
        throw new Error(`Unit type ${typeAsString} does not exist!`);
    }

    public getRandomUnit(units: Unit[]): Unit{
        return units[Math.floor(Math.random() * ((units.length - 1) - 0 + 1) + 0)];
    }

    public getUnitsHealhtPoints(units: Unit[]): number{
        let sum = 0;
        units.forEach(u => sum += u.healthPoints);
        return sum;
    }

    public getDeadUnits(units: Unit[]): Unit[]{
        return units.filter(unit => unit.isDestroyed === true);
    }

    public getDefendersAsString(units: Unit[]): string{
        let output: string = '';
        units.forEach((u, index) => output += index == units.length - 1 ? u.name : `${u.name}, `);
        return output;
    }
}

export class ResourceUtils{
    public getResourceTypeByString(typeAsString: string): ResourceType{
        if(typeAsString === 'FOOD' || typeAsString === 'LUMBER'
        || typeAsString === 'IRON'){
             const unitType: keyof typeof ResourceType = typeAsString;
             return ResourceType[unitType];
        }
        throw new Error(`Resource type ${typeAsString} does not exist!`);
    }

    public getQuantityByString(quantityAsString: string): number{
        if(Number(quantityAsString) < 1){
            throw new Error('Please provide valid quantity!');
        }
        return Number(quantityAsString);
    }

    public isPositionTaken(resources: Resource[], position: Position): boolean{
        return resources.find(res => res.position.x === position.x && res.position.y === position.y) ? true : false;
    }
}

export class CommonUtils{
    public getPositionByString(positionAsString: string): Position{
        const coordinates: string[] = positionAsString.split(',');
        return {x: Number(coordinates[0]), y: Number(coordinates[1])};
    }   
}