PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
import * as PIXI from 'pixi.js'
import { sound } from '@pixi/sound';
import { TownMap } from './TownMap'
import { Game } from './game'
import { Npc } from "./Npc"

export class Player extends PIXI.AnimatedSprite {
    //variables
    public xspeed: number;
    public yspeed: number;
    private direction: number; //clockwise, starting at north, 0-3
    private health: number;
    private woodclubTexture: PIXI.Texture;
    private tempTexture: PIXI.Texture;
    private townMap: TownMap;
    private game: Game;
    private action: Boolean = false
    public mapwidth = 3050 //De breedte van het Map
    public  mapheight = 2350 //De lengte van de Map
    public  centerx = 720 // midden van de viewport X
    public  centery = 564.5 // midden van de viewport Y
    

    constructor(game: Game, townMap: TownMap, textures: PIXI.Texture[], woodclubTexture: PIXI.Texture) {
        super(textures)
        sound.add("ding", "ding.mp3")
        console.log("hyaa! i am link!");
        
        
        this.xspeed = 0;
        this.yspeed = 0;
        this.direction = 2;
        this.townMap = townMap;
        this.game = game;
        this.anchor.set(0.5);
        this.x = game.pixi.screen.width / 2;
        this.y = game.pixi.screen.height / 2;

        this.health = 10
        //this.inventory.push("sword", "mysCrystal")

        this.x = 400
        this.y = 400
        this.animationSpeed = 0.05;
        this.scale.set(2)
        console.log(textures)
        this.play();
        

        this.woodclubTexture = woodclubTexture

        window.addEventListener("keydown", (e: KeyboardEvent) => this.move(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.unMove(e))
        this.game.pixi.stage.addChild(this)
    }

    // ??? does some math idk ask Bilal
    public clamp(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max)
    }

// on button press, sets appropriate speed, or calls function for interactivity
    private move(e: KeyboardEvent): void {
        if(this.action){
            return;}
            else{
        switch (e.key.toUpperCase()) {
           
            case "A":
            case "ARROWLEFT":
                this.direction = 3
                this.xspeed = -3
                this.scale.x = -2
                if (e.repeat)return
                else 
                this.textures = this.game.PlayerActionAnimation("walk")
                this.play()
                break
            case "D":
            case "ARROWRIGHT":
                this.direction = 1
                this.xspeed = 3    
                this.scale.x = 2 
                if (e.repeat)return
                else 
                this.textures = this.game.PlayerActionAnimation("walk")
                this.play()        
                break
            case "W":
            case "ARROWUP":
                this.direction = 0
                this.yspeed = -3
                if (e.repeat)return
                else 
                this.textures = this.game.PlayerActionAnimation("walkUp")
                this.play() 
                break
            case "S":
            case "ARROWDOWN":
                this.direction = 2
                this.yspeed = 3
                if (e.repeat)return
                else 
                this.textures = this.game.PlayerActionAnimation("walkDown")
                this.play() 
                break
            case "K":
                this.attack()
                break
            case "E":
                this.textures = this.game.PlayerActionAnimation("interact")
                this.play()
                sound.play("ding")
                this.action = true
                this.yspeed = 0
                this.xspeed = 0
                setTimeout(() =>{ this.textures = this.game.PlayerIdleAnimation() 
                this.play() 
                this.action = false
                }, 1000)
                break
        }
    }
    }

    // on button release, resets appropriate speeds
    private unMove(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                if(this.yspeed == 0){
                    this.textures = this.game.PlayerIdleAnimation()
                    this.play()  }
                    else if(this.yspeed < 0){
                        this.game.PlayerActionAnimation("walkUp")
                        this.play()
                    }else if(this.xspeed > 0){
                        this.game.PlayerActionAnimation("walkDown")
                        this.play()
                    }
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                if(this.xspeed == 0){
                this.textures = this.game.PlayerIdleAnimation()
                this.play()  }
                else if(this.xspeed < 0){
                    this.game.PlayerActionAnimation("Walk")
                    this.scale.x = -2
                    this.play()
                }else if(this.xspeed > 0){
                    this.game.PlayerActionAnimation("Walk")
                    this.scale.x = 2
                    this.play()
                }
                break
        }
    }

    // attacks, changes character sprite to woodenclub. not right.
    private attack() {
        console.log("ATTACKKKKK")
        this.tempTexture = this.texture
        this.texture = this.woodclubTexture
        this.woodclubTexture = this.tempTexture
    }
}
