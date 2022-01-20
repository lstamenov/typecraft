import { ResourceType, Team, UnitType } from "src/classes/enum.types";
import Resource from "src/classes/Resource";
import TeamEntity from "src/engine/TeamEntity";

export interface Position {
    x: number;
    y: number;
}

export interface WorldObjectModel {
    isDestroyed: boolean;
    healthPoints: number;
    position: Position;
    canMove: boolean;
    team: Team;

}

export interface ResourceModel {
    quantity: number;
    type: ResourceType;
}

export interface UnitModel {
    name: string;
    attack: number;
    defense: number;
    canGather: boolean;
    type: UnitType;
}

export interface ResourceStorageModel {
    lumberStored: Resource;
    foodStored: Resource;
    ironStored: Resource;
}

export interface EngineModel {
    redTeam: TeamEntity;
    blueTeam: TeamEntity;
}
