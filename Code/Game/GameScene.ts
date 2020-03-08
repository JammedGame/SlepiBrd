export { GameScene };

import * as TBX from "toybox-engine";

import { Level } from "./Elements/Level";
import { Player } from "./Elements/Player";

enum DayState
{
    Day = "Day",
    DayToNight = "DayToNight",
    Night = "Night",
    NightToDay = "NightToDay"
}

class GameScene extends TBX.Scene2D
{   
    public static Current:GameScene;
    public State: DayState;
    private _Level:Level;
    private _Player:Player;
    private _Score:number;
    private _ScoreLabel:TBX.Label;
    private _GoUp:boolean;
    private _GoDown:boolean;
    public get Score():number { return this._Score; }
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameScene();
            GameScene.Current = this;
        }
    }
    private InitGameScene() : void
    {
        this.State = DayState.Day;
        this.Name = "Game";
        this.CreateBackground("Light");
        this.Events.Click.push(this.Click.bind(this));
        this.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Events.KeyUp.push(this.KeyUp.bind(this));
        this.Events.Update.push(this.Update.bind(this));
        this._Level = new Level(null, this);
        this._Player = new Player(null, this);
        this._Score = 0;
        this._ScoreLabel = this.CreateLabel("0");
    }
    public Reset() : void
    {
        this._ScoreLabel.Text = "0";
        this._Player.Reset();
        this._Level.Reset();
    }
    private Update() : void
    {
        if(this._GoUp) this._Player.Move(-1);
        if(this._GoDown) this._Player.Move(1);
        this._Player.Update();
        this._Score = Math.floor((-this.Trans.Translation.X) / 400);
        this._ScoreLabel.Text = this._Score.toString();
        this._ScoreLabel.Update();
    }
    private Click(G:TBX.Game, Args:any) : void
    {
        //this._Player.Jump();
    }
    private KeyDown(G:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 38 || Args.KeyCode == 83)
        {
            this._GoUp = true;
            this._GoDown = false;
        }
        if(Args.KeyCode == 40 || Args.KeyCode == 87)
        {
            this._GoDown = true;
            this._GoUp = false;
        }
    }
    private KeyUp(G:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 38 || Args.KeyCode == 83)
        {
            this._GoUp = false;
        }
        if(Args.KeyCode == 40 || Args.KeyCode == 87)
        {
            this._GoDown = false;
        }
    }
    protected CreateBackground(Name:string) : void
    {
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        Back.Fixed = true;
        this.Attach(Back);
    }
    protected CreateLabel(Text:string) : TBX.Label
    {
        let Label:TBX.Label = new TBX.Label(null, Text);
        Label.Size = new TBX.Vertex(800, 80);
        Label.TextSize = 60;
        Label.Position = new TBX.Vertex(960, 100, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Label.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
}