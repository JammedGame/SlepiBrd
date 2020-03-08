export { Level }

import * as TBX from "toybox-engine";
import { Wall } from "./Wall";
import { WallGroup } from "./WallGroup";
import { GameScene, DayState } from "../GameScene";
import { Radar } from "./Radar";

class Level
{
    private _Scene:GameScene;
    private _Radars: Radar[];
    private _Obstacles: WallGroup[];
    public constructor(Old?:Level, Scene?:GameScene)
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
        this._Radars = [];
        this._Obstacles = [];
        let CurrentOffset = 0;
        for(let i = 0; i < 300; i++)
        {
            let Offset:number = TBX.Random.Next(800,1400);
            CurrentOffset += Offset;
            this.GenerateObstacle(800 + CurrentOffset);
        }
    }
    public Update() : void
    {
        this._Radars.forEach(Radar =>
        {
            Radar.Update();
            if(Radar.Complete)
            {
                this._Scene.Remove(Radar);
            }
            if(this._Scene.State == DayState.Night)
            {
                this.ApplyRadar(Radar);
            }
        });
        this._Radars = this._Radars.filter(Radar => !Radar.Complete);
        this._Obstacles.forEach(Obstacle => Obstacle.Update());
    }
    public CreateRadar() : void
    {
        let Position: number = -this._Scene.Trans.Translation.X;
        let R: Radar = new Radar(Position, this._Scene.Player.Speed * 5);
        this._Radars.push(R);
        this._Scene.Attach(R);
    }
    public Reset() : void
    {
        this._Radars = [];
        for(let i = 0; i < this._Obstacles.length; i++)
        {
            this._Obstacles[i].Destroy();
        }
        this._Obstacles = [];
        this.Init();
    }
    private GenerateObstacle(Offset:number) : void
    {
        let Location:number = TBX.Random.Next(250,930);
        this._Obstacles.push(new WallGroup(this._Scene, new TBX.Vertex(Offset, Location)));
    }
    private ApplyRadar(Radar: Radar) : void
    {
        this._Obstacles.forEach(Group =>
        {
            if(Math.abs(Group.Position.X - Radar.XPosition) < 100)
            {
                Group.Enlighten();
            }
        });
    }
}