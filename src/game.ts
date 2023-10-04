import * as PIXI from 'pixi.js'
import { Assets } from './assets'
import { TownMap } from "./TownMap"
import { Player} from "./Player"
import { Npc } from "./Npc"
import { UPDATE_PRIORITY } from 'pixi.js'


/* 
** alle afbeelding worden nu geladen in assets.ts. assets.ts is extended als pixi.assets.
** als je een nieuwe npc sprite toe wilt voegen, maak een entry aan in static/npcs.json, 
** en import & load het in assets.ts
** zorg dat de npcsToLoad waardes identiek zijn aan de filename excl. .png
*/

export class Game{
    public pixi : PIXI.Application //canvas element in de html file
    public assets = new Assets(this)

    private player : Player
    private npcsToLoad : string[] = []
    public npcs: Npc[] = []
    public townMap : TownMap
   

    constructor(){
        console.log("ik ben een game")
        this.pixi = new PIXI.Application({ width: 1440, height: 1129})
        // console.log(this.pixi)
        this.pixi.stage.x = this.pixi.screen.width / 2;
        this.pixi.stage.y = this.pixi.screen.height / 2;

        document.body.appendChild(this.pixi.view)
    }

    public loadCompleted() {
        //creates quest tracker object
       

        //creates background image
        this.townMap = new TownMap(this.assets.resources["townTexture"].texture!)
        this.pixi.stage.addChild(this.townMap)

        //creates player character
        let frames = this.PlayerIdleAnimation()
        this.player = new Player(this, this.townMap, frames, this.assets.resources['woodclubTexture'].texture!)
        

        //creates npc
        this.npcsToLoad.push("Holbewoner", "Bunny")
        for(let npcName of this.npcsToLoad){
            let npcData = this.assets.npcJson.find(item => item.name === npcName)
            // console.log(npcData)
            let npc = new Npc(this.assets.resources[npcName].texture!, npcData.name, npcData.questName, npcData.dialogue, npcData.direction, npcData.x, npcData.y, npcData.scale, npcData.anchor, this)
            // console.log(npc)
            this.pixi.stage.addChild(npc)
            this.npcs.push(npc)
        }

        //updater
        this.pixi.ticker.add((delta:number) => this.update(delta));
    }

    public update(delta: number){
        this.player.update(delta)
        this.player.x += this.player.xspeed
        this.player.y += this.player.yspeed

        
        let mapx = this.player.clamp(this.player.x, this.player.centerx, this.player.mapwidth - this.player.centerx)
        let mapy = this.player.clamp(this.player.y, this.player.centery, this.player.mapheight - this.player.centery)
        this.pixi.stage.pivot.set(mapx, mapy) 

    


    }
    
    public PlayerIdleAnimation(): PIXI.Texture[] {
       let frames: PIXI.Texture[] = []
       
       for (let i = 1; i < 6; i++) {
        frames.push(PIXI.Texture.from(`Character_Idle${i}.png`));
    }
       return frames

    }

    public PlayerActionAnimation(animationRequest : String): PIXI.Texture[] {
        let frames: PIXI.Texture[] = []
        
        if(animationRequest == "walk"){
            for (let i = 1; i <= 4; i++) {
            frames.push(PIXI.Texture.from(`Character_Walk${i}.png`));
            }
            return frames}
        else if(animationRequest == "walkUp"){
            for (let i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.from(`Character_Walk_Up${i}.png`));
            }
            return frames
            } 
        else if(animationRequest == "walkDown"){
            for (let i = 1; i <= 2; i++) {
            frames.push(PIXI.Texture.from(`Character_Walk_Down${i}.png`));
            }
            return frames
            }
        else if(animationRequest =="interact"){
            frames.push(PIXI.Texture.from(`Character_Interact.png`))
            return frames
            }
        else
        for (let i = 1; i < 6; i++) {
            frames.push(PIXI.Texture.from(`Character_Idle${i}.png`));  
            }
            return frames 
    }


}
