export { UIScene }; 

import * as TBX from "toybox-engine";

import { Slider } from "./Elements/Slider";

class UIScene extends TBX.Scene2D 
{ 
    protected _Title:TBX.Label;
    protected _OverColor:TBX.Color;
    public constructor(Old?:UIScene) 
    { 
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitUIScene(); 
        }
    } 
    private InitUIScene() : void
    { 
        this.Name = "UI";
        this._OverColor = TBX.Color.Black;
        this._Title = new TBX.Label(null, "Title");
        this._Title.Size = new TBX.Vertex(1920,200,1);
        this._Title.Position = new TBX.Vertex(960,300);
        this._Title.BackColor = TBX.Color.FromRGBA(0,0,0,0);
        this._Title.Border.Width = 0;
        this._Title.ForeColor = TBX.Color.FromRGBA(255,255,255,255);
        this._Title.TextSize = 60;
        this.Attach(this._Title);
    }
    protected CreateBackground(Name:string) : void
    {
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        this.Attach(Back);
    }
    protected CreateButton(Text:string, Order:number) : TBX.Button
    {
        let Button:TBX.Button = new TBX.Button(null, Text);
        Button.Name = Text;
        Button.Position = new TBX.Vertex(960, 500 + 120 * Order, 0.2);
        Button.Size = new TBX.Vertex(350, 100, 1);
        Button.Padding = 17;
        Button.ForeColor = TBX.Color.FromRGBA(255,255,255,255);
        Button.BackColor = TBX.Color.FromRGBA(0,0,0,0);
        Button.Border.Width = 2;
        Button.Border.Radius = 8;
        Button.Border.Color = TBX.Color.White;
        this.Attach(Button);
        return Button;
    }
    protected CreateLabel(Text:string, Order:number) : TBX.Label
    {
        let Label:TBX.Label = new TBX.Label(null, Text);
        Label.Name = Text;
        Label.Size = new TBX.Vertex(800, 50);
        Label.TextSize = 30;
        Label.Position = new TBX.Vertex(960, 400 + 60 * Order, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(255,255,255,255);
        Label.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
    protected CreateSlider(Text:string, Value:number, Order:number) : Slider
    {
        let NewSlider:Slider = new Slider(null, Text, Value);
        NewSlider.Name = Text;
        NewSlider.Position = new TBX.Vertex(960, 500 + 120 * Order, 0.2);
        this.Attach(NewSlider);
        return NewSlider;
    }
}