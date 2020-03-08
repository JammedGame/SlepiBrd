export { GameScene, DayState };

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
	public static CycleLength:number = 10; // seconds
	public static DayToNightPercentage:number = 0.25;
	public static NightPercentage:number = 0.5;
	public static NightToDayPercentage:number = 0.75;
	public State: DayState;
	private _CycleProgress:number;
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
		this._CycleProgress = 0;
        this._Level = new Level(null, this);
        this._Player = new Player(null, this);
        this._Score = 0;
        this._ScoreLabel = this.CreateLabel("0");
    }
    public Reset() : void
    {
		this.State = DayState.Day;
        this._ScoreLabel.Text = "0";
        this._Player.Reset();
        this._Level.Reset();
		this._CycleProgress = 0;
    }
    private Update() : void
    {
        if(this._GoUp) this._Player.Move(-1);
        if(this._GoDown) this._Player.Move(1);
        this._Level.Update();
        this._Player.Update();
        this._Score = Math.floor((-this.Trans.Translation.X) / 400);
        this._ScoreLabel.Text = this._Score.toString();
		this._ScoreLabel.Update();
		this.UpdateDayState();
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
	private UpdateDayState() : void
	{
		this._CycleProgress += 1 / GameScene.CycleLength / 60;
		if (this._CycleProgress >= 1) this._CycleProgress = 0;

		let expectedState:DayState;
		if (this._CycleProgress > GameScene.NightToDayPercentage) expectedState = DayState.NightToDay;
		else if (this._CycleProgress > GameScene.NightPercentage) expectedState = DayState.Night;
		else if (this._CycleProgress > GameScene.DayToNightPercentage) expectedState = DayState.DayToNight;
		else expectedState = DayState.Day;
		
		if (expectedState != this.State)
		{
			this.State = expectedState;
			console.log("day state changed", expectedState);

			switch (expectedState)
			{
				case DayState.Day:
					break;
				case DayState.DayToNight:
					break;
				case DayState.Night:
					break;
				case DayState.NightToDay:
					break;
			}
		}
	}
}