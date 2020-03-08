export { Fuel }

import * as TBX from "toybox-engine";

class Fuel extends TBX.Tile
{
    public static Collection: TBX.ImageCollection;
	public IsFuel: boolean = true;
    private _Scene:TBX.Scene2D;
    public constructor(Scene?:TBX.Scene2D, Position?:TBX.Vertex)
    {
		super();
        if(!Fuel.Collection)
        {
            Fuel.Collection = new TBX.ImageCollection(null, ["Resources/Textures/radar-01.png"]);
        }
		this.Collection = Fuel.Collection;
		this.Index = 0;
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