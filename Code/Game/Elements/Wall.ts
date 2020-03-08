export { Wall }

import * as TBX from "toybox-engine";
import { GameScene, DayState } from "../GameScene";

class Wall extends TBX.Tile
{
    public static Collection: TBX.ImageCollection;
    public static TentacleCollection: TBX.ImageCollection;
	public IsWall: boolean = true;
    private _BasePosition:TBX.Vertex;
    public constructor(Position?:TBX.Vertex)
    {
        super();
        if(!Wall.Collection)
        {
            Wall.Collection = new TBX.ImageCollection(null, ["Resources/Textures/pillar0.png", "Resources/Textures/pillar1.png", "Resources/Textures/pillar2.png"]);
            Wall.TentacleCollection = new TBX.ImageCollection(null, ["Resources/Textures/tentacle0.png", "Resources/Textures/tentacle0.png", "Resources/Textures/tentacle0.png"]);
        }
        this.Collection = Wall.Collection;
        this._BasePosition = Position;
        this.Size = new TBX.Vertex(80, 750, 1);
        this.Index = TBX.Random.Next(0, 2);
        let Flip:boolean = TBX.Random.Next(0, 1) > 0;
        this.FlipX = Flip;
        this.Position = new TBX.Vertex(Position.X, Position.Y, 0.4);
        this.Paint = TBX.Color.Black;
        this.Collision.Active = true;
    }
    public UpdateCollection(Day: boolean) : void
    {
        if(Day && this.Collection != Wall.Collection)
        {
            this.Collection = Wall.Collection;
            this.Modified = true;
        } 
        else if(!Day && this.Collection != Wall.TentacleCollection)
        {
            this.Collection = Wall.TentacleCollection;
            this.Modified = true;
        }
    }
}