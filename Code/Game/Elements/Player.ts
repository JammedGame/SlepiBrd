export { Player }

import * as TBX from "toybox-engine";

class Player extends TBX.Tile
{
    private _SpeedFactor:number;
    private _Scene:TBX.Scene2D;
    private _Velocity:TBX.Vertex;
    public constructor(Old?:Player, Scene?:TBX.Scene2D)
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
        this._SpeedFactor = 0;
        this.Size = new TBX.Vertex(60,60,1);
        this.Position = new TBX.Vertex(200,400,0.4);
        this.Paint = TBX.Color.Black;
        this._Scene.Attach(this);
        this._Velocity = new TBX.Vertex();
    }
    public Reset() : void
    {
        this._SpeedFactor = 0;
        this.Position = new TBX.Vertex(200,400,0.4);
        this._Velocity = new TBX.Vertex();
        this._Scene.Trans.Translation.X = 0;
    }
    public Update() : void
    {
        this._SpeedFactor += 0.01;
        this._Velocity.Y -= 0.3* (this._Velocity.Y / Math.abs(this._Velocity.Y));
        this.Position.Add(this._Velocity.Copy().Scalar(-1));
        this.Position.X += 2 + this._SpeedFactor;
        this._Scene.Trans.Translation.X -= 2 + this._SpeedFactor;
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
            this.GameOver();
        }
    }
    public Move(Direction: number) : void
    {
        this._Velocity.Y = 8 * Direction;
    }
    private GameOver() : void
    {
        TBX.Runner.Current.SwitchScene("GameOver");
    }
}