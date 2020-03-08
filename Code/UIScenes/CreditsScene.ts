export { CreditsScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene"; 

class CreditsScene extends UIScene
{
    public static Current:CreditsScene;
    private _Back:TBX.Button;
    public constructor(Old?:CreditsScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitCreditsScene();
            CreditsScene.Current = this;
        }
    }
    private InitCreditsScene() : void
    {
        this.Name = "Credits";
        this._Title.Text = "CREDITS";
        this.CreateBackground("Dark");
        this._OverColor = TBX.Color.FromRGBA(0,0,0,255);
        this.CreateLabel("Đorđe Cvijić", 0);
        this.CreateLabel("Suzana Miladinov", 1);
        this.CreateLabel("Miloš Manojlović", 2);
        this.CreateLabel("Žarko Goronja", 3);
        this._Back = this.CreateButton("BACK", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}