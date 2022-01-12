import { ResourceType, Team} from "src/classes/enum.types";
import { Position } from "src/classes/models";
import Resource from "src/classes/Resource";
import TeamEntity from "./TeamEntity";
import { UnitUtils, CommonUtils, ResourceUtils} from "src/utils/utils";

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

}