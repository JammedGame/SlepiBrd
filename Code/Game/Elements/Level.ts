export { Level }

import * as TBX from "toybox-engine";
import { Wall } from "./Wall";

class Level
{
    private _Scene:TBX.Scene2D;
    private _Obstacles: Wall[];
    public constructor(Old?:Level, Scene?:TBX.Scene2D)
    {
        this._Scene = Scene;
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        this._Obstacles = [];
        for(let i = 0; i < 100; i++)
        {
            this.GenerateObstacle(i * 400 + 540);
        }
    }
    public Reset() : void
    {
        for(let i = 0; i < this._Obstacles.length; i++)
        {
            this._Scene.Remove(this._Obstacles[i]);
        }
        this._Obstacles = [];
        this.Init();
    }
    private GenerateObstacle(Offset:number) : void
    {
        let Location:number = TBX.Random.Next(350,830);
        let UpperTile:Wall = new Wall(null, this._Scene, new TBX.Vertex(Offset, Location));
        this._Obstacles.push(UpperTile);
        let LowerTile:Wall = new Wall(null, this._Scene, new TBX.Vertex(Offset, Location + 500));
        this._Obstacles.push(LowerTile);
        this._Scene.Attach(UpperTile);
        this._Scene.Attach(LowerTile);
    }
}