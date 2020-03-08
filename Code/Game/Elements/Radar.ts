export { Radar }

import * as TBX from "toybox-engine";

class Radar
{
    private _Complete: boolean;
    private _Speed: number;
    private _Moved: number;
    private _Position: number;
    public get Complete() : boolean { return this._Complete; }
    public get Position() : number { return this._Position; }
    public constructor(Position: number, Speed: number)
    {
        this._Complete = false;
        this._Speed = Speed;
        this._Moved = 0;
        this._Position = Position;
    }
    public Update() : void
    {
        if(this.Complete) return;
        this._Position += this._Speed;
        this._Moved += this._Speed;
        if(this._Moved > 2500)
        {
            this._Complete = true;
        }
    }
}