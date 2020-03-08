export { Player }

import * as TBX from "toybox-engine";
import { Wall } from "./Wall";
import { Fuel } from "./Fuel";
import { GameScene, DayState } from "../GameScene";

class Player extends TBX.Tile
{
	public Fuel:number;
    private _SpeedFactor:number;
    private _Scene:GameScene;
    private _Velocity:TBX.Vertex;
    public get Speed():number { return 3 + this._SpeedFactor; }
    public constructor(Old?:Player, Scene?:GameScene)
    {
        super(Old);
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
		this.Fuel = GameScene.FuelInitial;
        this._SpeedFactor = 0;
        this.Size = new TBX.Vertex(60,60,1);
        this.Position = new TBX.Vertex(200,400,0.4);
        this.Paint = TBX.Color.Black;
        this._Scene.Attach(this);
        this._Velocity = new TBX.Vertex();
    }
    public Reset() : void
    {
		this.Fuel = GameScene.FuelInitial;
        this._SpeedFactor = 0;
        this.Position = new TBX.Vertex(200,400,0.4);
        this._Velocity = new TBX.Vertex();
        this._Scene.Trans.Translation.X = 0;
    }
    public Update() : void
    {
        this._SpeedFactor += 0.003;
        this._Velocity.Y -= (this._Velocity.Y / Math.abs(this._Velocity.Y)) * (Math.abs(this._Velocity.Y) / 8);
        this.Position.Add(this._Velocity.Copy().Scalar(-1));
        this.Position.X += this.Speed;
        this._Scene.Trans.Translation.X -= this.Speed;
        if(this.Position.Y < 0)
        {
            this.Position.Y = 0;
        }
        if(this.Position.Y > 1110)
        {
            this.Position.Y = 1110;
        }
        TBX.CollisionUtil.Check(this, this._Scene);
        if(this.Collision.Result.Collision)
        {
			for (let collider of this.Collision.Result.Colliders)
			{
				if (collider.Reference.IsWall)
				{
					this.GameOver();
				}
				else if (collider.Reference.IsFuel)
				{
					this.AddFuel(collider.Reference);
				}
			}
        }
    }
    public Move(Direction: number) : void
    {
        this._Velocity.Y = (10 + (this._SpeedFactor / 2)) * Direction;
    }
    private GameOver() : void
    {
        TBX.Runner.Current.SwitchScene("GameOver");
	}
	private AddFuel(fuel:Fuel) : void
	{
		fuel.Destroy();
		if (this._Scene.State == DayState.Night)
		{
			console.log("tried to add fuel at night ¯|_(ツ)_/¯");
		}
		else 
		{
			this.Fuel += GameScene.FuelPerBox;
			console.log("added fuel", this.Fuel);
		}
	}
}