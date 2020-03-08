export { Wall }

import * as TBX from "toybox-engine";
import { GameScene, DayState } from "../GameScene";

class Wall extends TBX.Sprite
{
    public static Collection: TBX.SpriteSetCollection;
    public static TentacleCollection: TBX.SpriteSetCollection;
	public IsWall: boolean = true;
    private _BasePosition:TBX.Vertex;
    public constructor(Position?:TBX.Vertex)
    {
        super();
        if(!Wall.Collection)
        {
            Wall.Collection = new TBX.SpriteSetCollection(null,
            [
                new TBX.SpriteSet(null, ["Resources/Textures/pillar0.png"], "S"),
                new TBX.SpriteSet(null, ["Resources/Textures/pillar1.png"], "S"),
                new TBX.SpriteSet(null, ["Resources/Textures/pillar2.png"], "S")
            ]);
            let TentacleSet = new TBX.SpriteSet(null, ["Resources/Textures/tentacle0.png", "Resources/Textures/tentacle1.png", "Resources/Textures/tentacle2.png"], "S");
            Wall.TentacleCollection = new TBX.SpriteSetCollection(null,
            [
                TentacleSet, TentacleSet, TentacleSet
            ]);
        }
        this.Collection = Wall.Collection;
        this._BasePosition = Position;
        this.Size = new TBX.Vertex(80, 750, 1);
        this.SetSpriteSet(TBX.Random.Next(0, 2));
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