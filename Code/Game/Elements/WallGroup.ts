export { WallGroup }

import { Wall } from "./Wall";
import * as TBX from "toybox-engine";
import { GameScene, DayState } from "../GameScene";

class WallGroup {
    private _EnlightenedDuration: number;
    private _Direction: number;
    private _Offset: number;
    private _MaxOffset: number;
    private _Upper: Wall;
    private _Lower: Wall;
    private _Scene: GameScene;
    private _BasePosition: TBX.Vertex;
    public get Position(): TBX.Vertex { return this._BasePosition; }
    public constructor(Scene?: GameScene, Position?: TBX.Vertex) {
        this._Scene = Scene;
        this._Offset = 0;
        this._EnlightenedDuration = 0;
        this._BasePosition = Position;
        this._Direction = (Math.random() - 0.5) * 5;
        this._MaxOffset = TBX.Random.Next(50, 100);
        this._Upper = new Wall(new TBX.Vertex(Position.X, Position.Y - 550));
        this._Lower = new Wall(new TBX.Vertex(Position.X, Position.Y + 550));
        this._Scene.Attach(this._Upper);
        this._Scene.Attach(this._Lower);
    }
    public Update(): void {

        this._Upper.UpdateCollection(this._Scene.State != DayState.Night);
        this._Lower.UpdateCollection(this._Scene.State != DayState.Night);
        if (this._Scene.State == DayState.Night) {
            this._Offset += this._Direction;
            if (Math.abs(this._Offset) > this._MaxOffset) {
                this._Direction *= -1;
            }
            this._Upper.Position.Y = this._BasePosition.Y - 550 + this._Offset;
            this._Lower.Position.Y = this._BasePosition.Y + 550 + this._Offset;
        }
        let Current: number = this._Upper.Paint.R;
        if (this._Scene.State == DayState.Night) {
            if (this._EnlightenedDuration > 0) this._EnlightenedDuration--;
            if (this._EnlightenedDuration > 0 && this._Upper.Paint.R < 255) {
                Current += 5;
                this._Upper.Paint.R = this._Upper.Paint.G = this._Upper.Paint.B = Current;
                this._Lower.Paint.R = this._Lower.Paint.G = this._Lower.Paint.B = Current;
            }
            if (this._EnlightenedDuration == 0 && this._Upper.Paint.R > 0) {
                Current -= 1;
                this._Upper.Paint.R = this._Upper.Paint.G = this._Upper.Paint.B = Current;
                this._Lower.Paint.R = this._Lower.Paint.G = this._Lower.Paint.B = Current;
            }
        }
        else if (this._Upper.Paint.R > 0) {
            Current -= 15;
            this._Upper.Paint.R = this._Upper.Paint.G = this._Upper.Paint.B = Current;
            this._Lower.Paint.R = this._Lower.Paint.G = this._Lower.Paint.B = Current;
        }
    }
    public Destroy(): void {
        this._Scene.Remove(this._Upper);
        this._Scene.Remove(this._Lower);
        this._Upper = null;
        this._Lower = null;
    }
    public Enlighten(): void {
        this._EnlightenedDuration = 75;
    }
}