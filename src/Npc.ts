import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Npc extends PIXI.Sprite {
    //variables
    public name: string
    public questName: string
    private dialogueArray : string[] = []
    private direction: number //clockwise, starting at north, 0-3
    private inRange: boolean
    private game: Game

    constructor(texture: PIXI.Texture, name: string, questName: string, dialogue: any, direction: number, x: number, y: number, scale: number, anchor: number, game: Game){
        super(texture)
        console.log("i am an npc!")

        //data is filled in from the static/npcs.json file. alter/add it there
        this.name = name
        this.questName = questName
        this.dialogueArray = dialogue

        this.direction = direction
        this.inRange = false
        this.game = game
        this.x = x
        this.y = y
            
        this.scale.set(scale)
        this.anchor.set(anchor)
    }

    //changes this.inRange between true or false. signifies whether the player is collided with this npc, and thus can interact.
    public setInRange(inRange: boolean){
        this.inRange = inRange
    }

    
    // retrieves this.inRange. used by player when attempting to interact
    public getInRange(){
        return this.inRange
    }


    

}