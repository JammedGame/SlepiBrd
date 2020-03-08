export { WallGroup }

import { Wall } from "./Wall";
import * as TBX from "toybox-engine";
import { GameScene, DayState } from "../GameScene";

class WallGroup
{
    private _Direction:number;
    private _Offset:number;
    private _MaxOffset:number;
    private _Upper: Wall;
    private _Lower: Wall;
    private _Scene:GameScene;
    private _BasePosition:TBX.Vertex;
    public constructor(Scene?:GameScene, Position?:TBX.Vertex)
    {
        this._Scene = Scene;
        this._Offset = 0;
        this._BasePosition = Position;
        this._Direction = (Math.random() - 0.5) * 2;
        this._MaxOffset = TBX.Random.Next(200,300);
        this._Upper = new Wall(new TBX.Vertex(Position.X, Position.Y - 700));
        this._Lower = new Wall(new TBX.Vertex(Position.X, Position.Y + 700));
        this._Scene.Attach(this._Upper);
        this._Scene.Attach(this._Lower);
    }
    public Update() : void
    {
        if(this._Scene.State == DayState.Night)
        {
            this._Offset += this._Direction;
            if(Math.abs(this._Offset) > this._MaxOffset)
            {
                this._Direction *= -1;
            }
            this._Upper.Position.Y = this._BasePosition.Y - 700 + this._Offset;
            this._Lower.Position.Y = this._BasePosition.Y + 700 + this._Offset;
        }
    }
    public Destroy() : void
    {
        this._Scene.Remove(this._Upper);
        this._Scene.Remove(this._Lower);
        this._Upper = null;
        this._Lower = null;
    }
}