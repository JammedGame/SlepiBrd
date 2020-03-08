export { Level }

import * as TBX from "toybox-engine";
import { Wall } from "./Wall";
import { WallGroup } from "./WallGroup";
import { Fuel } from "./Fuel";
import { GameScene, DayState } from "../GameScene";
import { Radar } from "./Radar";

class Level
{
    private _Scene:GameScene;
	private _Obstacles: WallGroup[];
	private _Fuels: Fuel[];
    private _Radars: Radar[];
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
		this._Obstacles = [];
		this._Fuels = [];
        this._Radars = [];
        let CurrentOffset = 0;
        for(let i = 0; i < 300; i++)
        {
            let Offset:number = TBX.Random.Next(800,1400);
            CurrentOffset += Offset;
			this.GenerateObstacle(800 + CurrentOffset);
			this.GenerateFuel(800 + CurrentOffset + 0.5 * Offset);
        }
    }
    public Update() : void
    {
		this._Obstacles.forEach(Obstacle => Obstacle.Update());
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
		for(let i = 0; i < this._Fuels.length; i++)
        {
            this._Fuels[i].Destroy();
        }
        this._Fuels = [];
        this.Init();
    }
    private GenerateObstacle(Offset:number) : void
    {
        let Location:number = TBX.Random.Next(350, 830);
        this._Obstacles.push(new WallGroup(this._Scene, new TBX.Vertex(Offset, Location)));
	}
	private GenerateFuel(Offset:number) : void
	{
		let Location:number = TBX.Random.Next(350, 830);
		this._Fuels.push(new Fuel(this._Scene, new TBX.Vertex(Offset, Location)));
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