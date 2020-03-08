export { Radar }

import * as TBX from "toybox-engine";

class Radar extends TBX.Tile
{
    private _Complete: boolean;
    private _Speed: number;
    private _Moved: number;
    public get Complete() : boolean { return this._Complete; }
    public get XPosition() : number { return this.Position.X; }
    public constructor(Position: number, Speed: number)
    {
        super();
        this._Complete = false;
        this._Speed = Speed;
        this._Moved = 0;
        this.Position = new TBX.Vertex(Position, 540, 0);
        this.Size = new TBX.Vertex(30, 1080, 1);
        this.Paint.A = 100;
    }
    public Update() : void
    {
        if(this.Complete) return;
        this.Position.X += this._Speed;
        this._Moved += this._Speed;
        if(this._Moved > 2500)
        {
            this._Complete = true;
        }
    }
}