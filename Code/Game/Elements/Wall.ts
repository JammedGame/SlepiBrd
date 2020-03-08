export { Wall }

import * as TBX from "toybox-engine";
import { GameScene, DayState } from "../GameScene";

class Wall extends TBX.Tile
{
    private _BasePosition:TBX.Vertex;
    public constructor(Position?:TBX.Vertex)
    {
        super();
        this._BasePosition = Position;
        this.Size = new TBX.Vertex(80, 1000, 1);
        this.Position = new TBX.Vertex(Position.X, Position.Y, 0.4);
        this.Paint = TBX.Color.Black;
        this.Collision.Active = true;
    }
}