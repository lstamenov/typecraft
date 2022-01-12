import {Team} from './enum.types';
import { Position } from './models';

export default abstract class WorldObject {
    private _isDestroyed: boolean;
    private _healthPoints: number;
    private _position: Position;
    private _canMove: boolean;
    private _team: Team;

    constructor( 
        healthPoints: number,
        position: Position,
        canMove: boolean = true,
        team: Team = Team.NEUTRAL){
            this._healthPoints = healthPoints;
            this._position = position;
            this._canMove = canMove;
            this._team = team;
            this.setIsDestroyed();
    }

    get position(): Position{
        return this._position;
    }

    get isDestroyed(): boolean{
        return this._isDestroyed;
    }

    get team(): Team{
        return this._team;
    }

    get canMove(): boolean{
        return this._canMove;
    }

    get healthPoints(): number{
        return this._healthPoints;
    }

    private setIsDestroyed(): void{
        if(this._healthPoints <= 0){
            this._isDestroyed = true;
            return;
        }
        this._isDestroyed = false;
    }

    public modifyPosition(position: Position): void{
        this._position = position;
    }

    public modifyHealthPoints(value: number): void{
        this._healthPoints += value;
        this.setIsDestroyed();
    }
}