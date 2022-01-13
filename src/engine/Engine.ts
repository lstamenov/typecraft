import { ResourceType, Team, UnitType} from "src/classes/enum.types";
import { Position } from "src/classes/models";
import Resource from "src/classes/Resource";
import TeamEntity from "./TeamEntity";
import { UnitUtils, CommonUtils, ResourceUtils} from "src/utils/utils";
import Unit from "src/classes/Unit";

export default class Engine {
    private _redTeam: TeamEntity;
    private _blueTeam: TeamEntity;
    private _resources: Resource[];
    private _unitUtils: UnitUtils;
    private _resourceUtils: ResourceUtils;
    private _commonUtils: CommonUtils;

    constructor(){
        this._redTeam = new TeamEntity(Team.RED);
        this._blueTeam = new TeamEntity(Team.BLUE);
        this._resources = [];
        this._unitUtils = new UnitUtils();
        this._resourceUtils = new ResourceUtils();
        this._commonUtils = new CommonUtils();
    }

    
    public createUnit(name: string, positionAsString: string, teamAsString: string, unitTypeAsString: string): string{
        try{
         this._unitUtils.validateUnitName(name, this._redTeam, this._blueTeam);
         const team = this._unitUtils.getUnitTeamByString(teamAsString);
         const unitType = this._unitUtils.getUnitTypeByString(unitTypeAsString.toUpperCase());
         const position = this._commonUtils.getPositionByString(positionAsString);
        if(team === 'RED'){
            this._redTeam.createUnit(name, position, team, unitType);
        }else{
            this._blueTeam.createUnit(name, position, team, unitType);
        }
        }catch(err){
           return (<Error>err).message;
        }

        return  `Created ${unitTypeAsString} from ${teamAsString} team named ${name} at position ${positionAsString}`;
    }

    public createResource(type: string, position: string, quantity: string): string{
        try{
            const resourceType: ResourceType = this._resourceUtils.getResourceTypeByString(type.toUpperCase());
            const resourcePosition: Position = this._commonUtils.getPositionByString(position);
            const resourceQuantity = this._resourceUtils.getQuantityByString(quantity);
            if(this._resourceUtils.isPositionTaken(this._resources, resourcePosition)){
                throw new Error('There cannot be two resources at the same coordinates!');
            }
            this._resources.push(new Resource(resourceQuantity, resourcePosition, resourceType));
        }catch(err){
           return (<Error>err).message;
        }
        return `Created ${type} at position ${position} with ${quantity} health!`;
    }

    private getUnitByName(name: string): Unit{
        const redTeamUnit = this._redTeam.getUnitByName(name);
        const blueTeamUnit = this._blueTeam.getUnitByName(name); 
        if(redTeamUnit){
            return redTeamUnit;
        }
        if(blueTeamUnit){
            return blueTeamUnit;
        }    
        throw new Error(`Unit ${name} does not exist!`);
    }

    private deleteDeadUnits(units: Unit[]): void{
        units.forEach(u => u.team === Team.BLUE ? this._blueTeam.deleteUnit(u) : this._redTeam.deleteUnit(u));
    }

    public performAttack(attackerName: string): string{
        try{
            const attacker: Unit = this.getUnitByName(attackerName);
            const enemyTeam: Team = attacker.team === Team.BLUE ? Team.RED : Team.BLUE;
            const defenders: Unit[] = enemyTeam === Team.BLUE ? 
            this._blueTeam.getUnitsByPosition(attacker.position)
            : this._redTeam.getUnitsByPosition(attacker.position);     
            const allies: Unit[] = enemyTeam === Team.RED ? 
            this._blueTeam.getUnitsByPosition(attacker.position)
            : this._redTeam.getUnitsByPosition(attacker.position);

            if(defenders.length === 0 && allies.length > 1){
                return `You cannot attack your friends, dummy!`;
            }

            if(defenders.length === 0 && allies.length === 1){
                return `There is nothing to attack!`;
            }


            if(attacker.type === UnitType.NINJA){
                let damageTaken: number = this._unitUtils.getUnitsHealhtPoints(defenders);
                defenders.forEach(d => attacker.attackEnemy(d));
                damageTaken -= this._unitUtils.getUnitsHealhtPoints(defenders);
                const deadUnits: Unit[] = this._unitUtils.getDeadUnits(defenders);
                console.log(defenders);
                this.deleteDeadUnits(deadUnits);
                return `There was a fierce fight between ${attacker.name} - attacker and ${this._unitUtils.getDefendersAsString(defenders)} - defenders. The defenders took totally 0 damage. The attacker took ${damageTaken} damage. There are ${deadUnits.length} dead units after the fight was over - ${this._unitUtils.getDefendersAsString(deadUnits)}`;
            }else {
                const defender = this._unitUtils.getRandomUnit(defenders);
                const attackerHealthBeforeFight = attacker.healthPoints;
                const defenderHealthBeforeFight = defender.healthPoints;
                attacker.attackEnemy(defender);
                const deadUnits: Unit[] = this._unitUtils.getDeadUnits([attacker, defender]);
                console.log(defender);
                this.deleteDeadUnits(deadUnits);
                return `There was a fierce fight between ${attacker.name} - attacker and ${defender.name} - defender. The defender took totally ${attackerHealthBeforeFight - attacker.healthPoints}. The attacker took ${defenderHealthBeforeFight - defender.healthPoints} damage. There are ${deadUnits.length} dead units after the fight was over - ${this._unitUtils.getDefendersAsString(deadUnits)}`;
            }
        }catch(err){
           return (<Error>err).message;
        }
    }

    private getResourceByPosition(position: Position): (Resource | undefined){
        return this._resources.find(res => res.position.x === position.x && res.position.y === position.y);
    }

    private deleteResource(resource: Resource): void{
        for(let i = 0; i < this._resources.length; i++){
            if(resource === this._resources[i]){
                this._resources.splice(i, 1);
                return;
            }
        }
    }

    public performGather(unitName: string): string{
        try{
            const unit: Unit = this.getUnitByName(unitName);
            const resource: (Resource | undefined) = this.getResourceByPosition(unit.position);
            if(!resource){
                return `There is nothing to gather`;
            }
            unit.gatherResource(resource);
            if(unit.team === Team.BLUE){
                this._blueTeam.resourceStorage.addResource(resource);
            }
            if(unit.team === Team.RED){
                this._redTeam.resourceStorage.addResource(resource);
            }
            this.deleteResource(resource);
            return `Successfully gathered ${resource.quantity} ${resource.type.toLowerCase()}. Team ${unit.team} now has ${unit.team === Team.BLUE ? this._blueTeam.resourceStorage.getResourcesInformation() : this._redTeam.resourceStorage.getResourcesInformation()}.`;
        }catch(err){
           return (<Error>err).message;
        }
    } 

    public performGo(unitName: string, positionAsString: string): string{
        try{
            const position = this._commonUtils.getPositionByString(positionAsString);
            const unit = this.getUnitByName(unitName);
            unit.modifyPosition(position);
            return `Unit ${unitName} moved to ${positionAsString}`;
        }catch(err){
           return (<Error>err).message;
        }
    }
}