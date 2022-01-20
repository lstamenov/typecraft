import { ResourceType, Team, UnitType } from "src/classes/enum.types";
import Resource from "src/classes/Resource";
import Unit from "src/classes/Unit";
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

    modifyPosition(position: Position): void;

    modifyHealthPoints(value: number): void;

}

export interface ResourceModel {
    quantity: number;
    type: ResourceType;

    getInformation(): string;

    toString(): string;
}

export interface UnitModel {
    name: string;
    attack: number;
    defense: number;
    canGather: boolean;
    type: UnitType;

    attackEnemy(enemy: Unit): void;

    move(enemyPosition: Position): void;

    gatherResource(resource: Resource): void

    getInformation(): string;
}

export interface ResourceStorageModel {
    lumberStored: Resource;
    foodStored: Resource;
    ironStored: Resource;

    addResource(resource: Resource): void;

    getResourcesInformation(): string;

    getStoragePoints(): number;
}

export interface EngineModel {
    redTeam: TeamEntity;
    blueTeam: TeamEntity;

    createUnit(name: string, positionAsString: string, teamAsString: string, unitTypeAsString: string): string;

    createResource(type: string, position: string, quantity: string): string;

    performAttack(attackerName: string): string;

    performGather(unitName: string): string;

    performGo(unitName: string, positionAsString: string): string;

    endGame(): string;

    showAll(): string;

    getUnitInformationByCoordinates(positionAsString: string): string;

    showAllResources(): string;

    showAllUnitsByTeam(teamAsString: string): string;
}
