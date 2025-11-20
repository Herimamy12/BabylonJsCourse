import { Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";

export class StandardMaterials  {
    scene: Scene
    engine: Engine

    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true)
        this.scene = this.CreateScene()


        this.engine.runRenderLoop(()=>{
            this.scene.render()
        })
    }


    CreateScene(): Scene {
        const scene = new Scene(this.engine)
        const camera = new FreeCamera("camera", new Vector3(0, 2, -12), this.scene)
        camera.attachControl()

        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene)
        hemiLight.intensity = 0.7

        const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, this.scene);

        const ball = MeshBuilder.CreateSphere("ball", {diameter: 5}, this.scene)
        ball.position = new Vector3(0, 2.5, 0)

        return scene
    }
}
