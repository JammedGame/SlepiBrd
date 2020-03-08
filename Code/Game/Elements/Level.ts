export { Level }

import * as TBX from "toybox-engine";
import { Wall } from "./Wall";
import { WallGroup } from "./WallGroup";
import { GameScene } from "../GameScene";
import { Fuel } from "./Fuel";

class Level
{
    private _Scene:GameScene;
	private _Obstacles: WallGroup[];
	private _Fuels: Fuel[];
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
    }
    public Reset() : void
    {
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
        let Location:number = TBX.Random.Next(250,930);
        this._Obstacles.push(new WallGroup(this._Scene, new TBX.Vertex(Offset, Location)));
	}
	private GenerateFuel(Offset:number) : void
	{
		let Location:number = TBX.Random.Next(250, 930);
		this._Fuels.push(new Fuel(this._Scene, new TBX.Vertex(Offset, Location)));
	}
}