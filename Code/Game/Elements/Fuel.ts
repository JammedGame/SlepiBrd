export { Fuel }

import * as TBX from "toybox-engine";

class Fuel extends TBX.Tile
{
	public IsFuel: boolean = true;
    private _Scene:TBX.Scene2D;
    public constructor(Scene?:TBX.Scene2D, Position?:TBX.Vertex)
    {
		super();
		this._Scene = Scene;
        this._Scene.Attach(this);
        this.Size = new TBX.Vertex(60,60,1);
		this.Position = Position;
        this.Paint = TBX.Color.Black;
        this.Collision.Active = true;
    }
    public Destroy() : void
    {
        this._Scene.Remove(this);
	}
}