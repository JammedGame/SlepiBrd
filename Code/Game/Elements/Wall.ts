export { Wall }

import * as TBX from "toybox-engine";

class Wall extends TBX.Sprite
{
    private _Scene:TBX.Scene2D;
    public constructor(Old?:Wall, Scene?:TBX.Scene2D, Position?:TBX.Vertex)
    {
        super(Old);
        this._Scene = Scene;
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Size = new TBX.Vertex(80, 1000, 1);
            this.Position = new TBX.Vertex(Position.X, Position.Y, 0.4);
            this.Paint = TBX.Color.Black;
            this.Collision.Active = true;
        }
    }
    public Update() : void
    {
        
    }
}